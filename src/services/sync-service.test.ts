
import { queueOperation, processQueue } from './sync-service';
import { db } from '@/lib/firebase';
import { writeBatch, doc } from 'firebase/firestore';

// Mocking external dependencies
jest.mock('@/lib/firebase', () => ({
  db: {},
}));

const batchMock = {
  set: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  commit: jest.fn(),
};

jest.mock('firebase/firestore', () => ({
  writeBatch: jest.fn(() => batchMock),
  doc: jest.fn((db, collection, id) => `mock/path/${id}`),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const SYNC_QUEUE_KEY = 'sync_queue';

describe('sync-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    // Reset Date.now mocking
    jest.spyOn(Date, 'now').mockRestore();
  });

  describe('queueOperation', () => {
    it('should add an operation to the queue with a timestamp', async () => {
        jest.spyOn(Date, 'now').mockReturnValue(1234567890);
        const operation = { type: 'add-expense' as const, payload: { id: '1', name: 'test' } };
        await queueOperation(operation);
  
        const queue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
        expect(queue).toHaveLength(1);
        expect(queue[0]).toEqual({ ...operation, timestamp: 1234567890 });
      });

    it('should overwrite previous save-packing-state operations', async () => {
      const firstOp = { type: 'save-packing-state' as const, payload: { state: 'old' } };
      const secondOp = { type: 'add-expense' as const, payload: { id: '1' } };
      const thirdOp = { type: 'save-packing-state' as const, payload: { state: 'new' } };

      await queueOperation(firstOp);
      await queueOperation(secondOp);
      await queueOperation(thirdOp);

      const queue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
      expect(queue).toHaveLength(2);
      expect(queue.filter(op => op.type === 'save-packing-state')).toHaveLength(1);
      expect(queue.find(op => op.type === 'save-packing-state').payload).toEqual({ state: 'new' });
    });
  });

  describe('processQueue', () => {
    it('should not do anything if the queue is empty', async () => {
      const result = await processQueue();
      expect(result).toBeUndefined();
      expect(writeBatch).not.toHaveBeenCalled();
    });

    it('should process all operations in the queue and clear it', async () => {
        const operations = [
          { type: 'add-expense', payload: { id: '1', name: 'test1' }, timestamp: 1 },
          { type: 'update-expense', payload: { id: '2', name: 'test2' }, timestamp: 2 },
          { type: 'delete-expense', payload: { id: '3' }, timestamp: 3 },
          { type: 'save-packing-state', payload: { packingState: { 'item-1': true } }, timestamp: 4 },
        ];
        localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(operations));
  
        (batchMock.commit as jest.Mock).mockResolvedValue(undefined);
  
        const result = await processQueue();
  
        expect(result).toBe(true);
        expect(batchMock.set).toHaveBeenCalledTimes(2); // add-expense and save-packing-state
        expect(batchMock.update).toHaveBeenCalledTimes(1);
        expect(batchMock.delete).toHaveBeenCalledTimes(1);
        expect(batchMock.commit).toHaveBeenCalled();
        expect(localStorage.getItem(SYNC_QUEUE_KEY)).toBeNull();
      });

    it('should preserve the queue if batch commit fails', async () => {
      const operations = [{ type: 'add-expense' as const, payload: { id: '1' }, timestamp: 1 }];
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(operations));

      (batchMock.commit as jest.Mock).mockRejectedValue(new Error('Commit failed'));

      const result = await processQueue();

      expect(result).toBe(false);
      expect(batchMock.commit).toHaveBeenCalled();
      expect(localStorage.getItem(SYNC_QUEUE_KEY)).toBeDefined();
    });
  });
});
