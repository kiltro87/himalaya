
import { Expense } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, query, orderBy, writeBatch, setDoc, deleteDoc } from 'firebase/firestore';
import { queueOperation, processQueue } from './sync-service';

const getLocalExpensesKey = () => `local_expenses`;
const getFirestoreCollection = () => collection(db, 'gastos');

// ========== Local Storage Functions ==========

const getSpentExpensesFromLocal = (): Expense[] => {
    if (typeof window === 'undefined') return [];
    const localData = localStorage.getItem(getLocalExpensesKey());
    return localData ? JSON.parse(localData) : [];
};

const saveSpentExpensesToLocal = (expenses: Expense[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(getLocalExpensesKey(), JSON.stringify(expenses));
};

// ========== Firestore Functions ==========

export const getSpentExpenses = async (): Promise<Expense[]> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.log("App is offline. Returning local expenses.");
    return getSpentExpensesFromLocal();
  }

  try {
    const q = query(getFirestoreCollection(), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    const expenses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Expense[];
    
    saveSpentExpensesToLocal(expenses);
    return expenses;
  } catch (error) {
    console.error("Error fetching from Firestore, falling back to local storage", error);
    return getSpentExpensesFromLocal();
  }
};

export const addSpentExpense = async (expenseData: Omit<Expense, 'id'> & { id?: string }): Promise<void> => {
  const localExpenses = getSpentExpensesFromLocal();
  const tempId = expenseData.id || doc(collection(db, '_')).id;
  const finalExpense: Expense = { ...expenseData, id: tempId };
  
  saveSpentExpensesToLocal([finalExpense, ...localExpenses]);

  await queueOperation({ type: 'add-expense', payload: finalExpense });
  
  if (navigator.onLine) {
    await processQueue();
  }
};

export const updateSpentExpense = async (expenseId: string, expenseData: Partial<Expense>): Promise<void> => {
    const localExpenses = getSpentExpensesFromLocal();
    const updatedExpenses = localExpenses.map(e => e.id === expenseId ? {...e, ...expenseData} : e);
    saveSpentExpensesToLocal(updatedExpenses);
    
    const operationPayload = { id: expenseId, ...expenseData };
    await queueOperation({ type: 'update-expense', payload: operationPayload });

    if (navigator.onLine) {
        await processQueue();
    }
};

export const deleteSpentExpense = async (expenseId: string): Promise<void> => {
    const localExpenses = getSpentExpensesFromLocal();
    saveSpentExpensesToLocal(localExpenses.filter(e => e.id !== expenseId));

    await queueOperation({ type: 'delete-expense', payload: { id: expenseId } });

    if (navigator.onLine) {
        await processQueue();
    }
};
