
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { queueOperation, processQueue } from './sync-service';

type PackingState = {
  [itemId: string]: boolean;
};

const getLocalPackingKey = () => `local_packing_state`;
const getPackingDocRef = () => doc(db, 'packingStates', 'main-packing-list');

const getPackingStateFromLocal = (): PackingState => {
    if (typeof window === 'undefined') return {};
    const localData = localStorage.getItem(getLocalPackingKey());
    return localData ? JSON.parse(localData) : {};
};

const savePackingStateToLocal = (state: PackingState) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(getLocalPackingKey(), JSON.stringify(state));
};


export const getPackingState = async (): Promise<PackingState> => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        console.log("App is offline. Returning local packing state.");
        return getPackingStateFromLocal();
    }

    try {
        const docRef = getPackingDocRef();
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const firestoreState = docSnap.data() as PackingState;
            savePackingStateToLocal(firestoreState);
            return firestoreState;
        } else {
            // If doesn't exist in Firestore, return local version (could be empty)
            return getPackingStateFromLocal();
        }
    } catch (error) {
        console.error("Error fetching packing state from Firestore, falling back to local.", error);
        return getPackingStateFromLocal();
    }
};

export const savePackingState = async (packingState: PackingState): Promise<void> => {
    savePackingStateToLocal(packingState); // Save to local immediately

    await queueOperation({ type: 'save-packing-state', payload: { packingState } });
    
    if (navigator.onLine) {
      await processQueue();
    }
};
