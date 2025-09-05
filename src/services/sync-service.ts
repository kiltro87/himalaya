
'use client';

import { db } from '@/lib/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';

const SYNC_QUEUE_KEY = 'sync_queue';

interface Operation {
  type: 'add-expense' | 'update-expense' | 'delete-expense' | 'save-packing-state';
  payload: any;
  timestamp?: number;
}

const getQueue = (): Operation[] => {
  if (typeof window === 'undefined') return [];
  const queueJson = localStorage.getItem(SYNC_QUEUE_KEY);
  return queueJson ? JSON.parse(queueJson) : [];
};

const saveQueue = (queue: Operation[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
};

export const queueOperation = async (operation: Omit<Operation, 'timestamp'>) => {
  console.log('SyncService: Queuing operation', operation);
  const queue = getQueue();
  const opWithTimestamp: Operation = { ...operation, timestamp: Date.now() };
  
  if (opWithTimestamp.type === 'save-packing-state') {
    // Overwrite previous packing state operations to only keep the latest
    const otherOps = queue.filter(op => op.type !== 'save-packing-state');
    saveQueue([...otherOps, opWithTimestamp]);
  } else {
    queue.push(opWithTimestamp);
    saveQueue(queue);
  }
};

export const processQueue = async () => {
  const queue = getQueue();
  if (queue.length === 0) {
    return;
  }
  console.log(`SyncService: Processing ${queue.length} items.`);

  try {
    const batch = writeBatch(db);
    
    for (const op of queue) {
        const { payload } = op;
        switch (op.type) {
            case 'add-expense':
                const addRef = doc(db, 'gastos', payload.id);
                batch.set(addRef, payload);
                break;
            case 'update-expense':
                const updateRef = doc(db, 'gastos', payload.id);
                batch.update(updateRef, payload);
                break;
            case 'delete-expense':
                const deleteRef = doc(db, 'gastos', payload.id);
                batch.delete(deleteRef);
                break;
            case 'save-packing-state':
                const packingDocRef = doc(db, 'packingStates', 'main-packing-list');
                batch.set(packingDocRef, payload.packingState);
                break;
        }
    }

    await batch.commit();
    console.log('SyncService: Batch committed successfully.');
    
    // Clear the queue after successful commit
    localStorage.removeItem(SYNC_QUEUE_KEY);
    return true;
  } catch (error) {
    console.error('SyncService: Error processing queue. Queue will be preserved for next attempt.', error);
     if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
        console.error("Firestore permission error. Please check your security rules in the Firebase console.");
     }
    return false;
  }
};
