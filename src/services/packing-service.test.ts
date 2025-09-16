
import { getPackingState, savePackingState } from './packing-service';
import { queueOperation, processQueue } from './sync-service';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Mocking external dependencies
jest.mock('./sync-service', () => ({
  queueOperation: jest.fn(),
  processQueue: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
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

const mockPackingState = { 'item-1': true, 'item-2': false };

describe('packing-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    Object.defineProperty(navigator, 'onLine', { writable: true, configurable: true, value: true });
  });

  describe('getPackingState', () => {
    it('should fetch packing state from Firestore and save to local storage when online', async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => true, data: () => mockPackingState });
      const state = await getPackingState();

      expect(state).toEqual(mockPackingState);
      expect(localStorage.getItem('local_packing_state')).toEqual(JSON.stringify(mockPackingState));
    });

    it('should return local packing state when offline', async () => {
      localStorage.setItem('local_packing_state', JSON.stringify(mockPackingState));
      Object.defineProperty(navigator, 'onLine', { value: false });

      const state = await getPackingState();

      expect(state).toEqual(mockPackingState);
      expect(getDoc).not.toHaveBeenCalled();
    });

    it('should return local state if Firestore call fails', async () => {
        localStorage.setItem('local_packing_state', JSON.stringify(mockPackingState));
        (getDoc as jest.Mock).mockRejectedValue(new Error('Firestore error'));

        const state = await getPackingState();

        expect(state).toEqual(mockPackingState);
    });

    it('should return local state if doc does not exist in Firestore', async () => {
        localStorage.setItem('local_packing_state', JSON.stringify({ 'local-item': true }));
        (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });
    
        const state = await getPackingState();
    
        expect(state).toEqual({ 'local-item': true });
      });
  });

  describe('savePackingState', () => {
    it('should save packing state locally and queue a save operation', async () => {
      await savePackingState(mockPackingState);

      expect(localStorage.getItem('local_packing_state')).toEqual(JSON.stringify(mockPackingState));
      expect(queueOperation).toHaveBeenCalledWith({ type: 'save-packing-state', payload: { packingState: mockPackingState } });
      expect(processQueue).toHaveBeenCalled();
    });

    it('should not process queue when offline', async () => {
        Object.defineProperty(navigator, 'onLine', { value: false });

        await savePackingState(mockPackingState);

        expect(localStorage.getItem('local_packing_state')).toEqual(JSON.stringify(mockPackingState));
        expect(queueOperation).toHaveBeenCalledWith({ type: 'save-packing-state', payload: { packingState: mockPackingState } });
        expect(processQueue).not.toHaveBeenCalled();
    });
  });
});
