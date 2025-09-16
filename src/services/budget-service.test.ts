
import { getSpentExpenses, addSpentExpense, updateSpentExpense, deleteSpentExpense } from './budget-service';
import { queueOperation, processQueue } from './sync-service';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc } from 'firebase/firestore';
import { Expense } from '@/lib/types';

// Mocking external dependencies
jest.mock('./sync-service', () => ({
  queueOperation: jest.fn(),
  processQueue: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(() => ({ id: 'mock-id' })),
    query: jest.fn(),
    orderBy: jest.fn(),
    writeBatch: jest.fn(),
    setDoc: jest.fn(),
    deleteDoc: jest.fn(),
  }));

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockExpenses: Expense[] = [
  { id: '1', name: 'Lunch', amount: 15, date: '2024-01-01', category: 'food' },
  { id: '2', name: 'Train ticket', amount: 50, date: '2024-01-01', category: 'transport' },
];

describe('budget-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    Object.defineProperty(navigator, 'onLine', { writable: true, configurable: true, value: true });
  });

  describe('getSpentExpenses', () => {
    it('should fetch expenses from Firestore and save to local storage when online', async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: mockExpenses.map(e => ({ id: e.id, data: () => e })) });
      const expenses = await getSpentExpenses();

      expect(expenses).toEqual(mockExpenses);
      expect(localStorage.getItem('local_expenses')).toEqual(JSON.stringify(mockExpenses));
    });

    it('should return local expenses when offline', async () => {
        localStorage.setItem('local_expenses', JSON.stringify(mockExpenses));
        Object.defineProperty(navigator, 'onLine', { value: false });
  
        const expenses = await getSpentExpenses();
  
        expect(expenses).toEqual(mockExpenses);
        expect(getDocs).not.toHaveBeenCalled();
      });

    it('should return local expenses if Firestore fails', async () => {
        localStorage.setItem('local_expenses', JSON.stringify(mockExpenses));
        (getDocs as jest.Mock).mockRejectedValue(new Error('Firestore error'));

        const expenses = await getSpentExpenses();

        expect(expenses).toEqual(mockExpenses);
    });
  });

  describe('addSpentExpense', () => {
    it('should add an expense locally and queue an add operation', async () => {
      const newExpense = { name: 'Coffee', amount: 5, date: '2024-01-02', category: 'food' };
      await addSpentExpense(newExpense);

      const localExpenses = JSON.parse(localStorage.getItem('local_expenses') || '[]');
      expect(localExpenses[0]).toMatchObject(newExpense);
      expect(queueOperation).toHaveBeenCalledWith({ type: 'add-expense', payload: expect.any(Object) });
      expect(processQueue).toHaveBeenCalled();
    });
  });

  describe('updateSpentExpense', () => {
    it('should update an expense locally and queue an update operation', async () => {
      localStorage.setItem('local_expenses', JSON.stringify(mockExpenses));
      const updatedData = { amount: 20 };
      await updateSpentExpense('1', updatedData);

      const localExpenses = JSON.parse(localStorage.getItem('local_expenses') || '[]');
      const updatedExpense = localExpenses.find((e: Expense) => e.id === '1');
      expect(updatedExpense?.amount).toBe(20);
      expect(queueOperation).toHaveBeenCalledWith({ type: 'update-expense', payload: { id: '1', ...updatedData } });
      expect(processQueue).toHaveBeenCalled();
    });
  });

  describe('deleteSpentExpense', () => {
    it('should delete an expense locally and queue a delete operation', async () => {
      localStorage.setItem('local_expenses', JSON.stringify(mockExpenses));
      await deleteSpentExpense('1');

      const localExpenses = JSON.parse(localStorage.getItem('local_expenses') || '[]');
      expect(localExpenses.find((e: Expense) => e.id === '1')).toBeUndefined();
      expect(queueOperation).toHaveBeenCalledWith({ type: 'delete-expense', payload: { id: '1' } });
      expect(processQueue).toHaveBeenCalled();
    });
  });
});
