import { db } from './firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

const WORDS_COLLECTION = 'words';

/**
 * Get all words from Firestore
 */
export async function getAllWords() {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const snapshot = await getDocs(wordsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching words:', error);
    throw error;
  }
}

/**
 * Get words by difficulty level
 */
export async function getWordsByDifficulty(difficulty) {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const q = query(wordsRef, where('difficulty', '==', difficulty));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching words by difficulty:', error);
    throw error;
  }
}

/**
 * Get words by category
 */
export async function getWordsByCategory(category) {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const q = query(wordsRef, where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching words by category:', error);
    throw error;
  }
}

/**
 * Search words by text (prefix search)
 */
export async function searchWords(searchTerm) {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const q = query(
      wordsRef,
      where('word', '>=', searchTerm.toLowerCase()),
      where('word', '<=', searchTerm.toLowerCase() + '\uf8ff'),
      limit(50)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error searching words:', error);
    throw error;
  }
}

/**
 * Get a single word by ID
 */
export async function getWordById(wordId) {
  try {
    const wordRef = doc(db, WORDS_COLLECTION, wordId);
    const wordDoc = await getDoc(wordRef);

    if (wordDoc.exists()) {
      return { id: wordDoc.id, ...wordDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching word:', error);
    throw error;
  }
}

/**
 * Add a new word to Firestore
 */
export async function addWord(wordData) {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const docRef = await addDoc(wordsRef, {
      ...wordData,
      word: wordData.word.toLowerCase().trim(),
      addedDate: new Date(),
      source: wordData.source || 'user-contributed',
      verified: wordData.verified || false,
      usageCount: 0,
      category: wordData.category || 'custom',
      difficulty: wordData.difficulty || 'intermediate'
    });

    return { id: docRef.id, ...wordData };
  } catch (error) {
    console.error('Error adding word:', error);
    throw error;
  }
}

/**
 * Update a word
 */
export async function updateWord(wordId, updates) {
  try {
    const wordRef = doc(db, WORDS_COLLECTION, wordId);
    await updateDoc(wordRef, updates);
    return { id: wordId, ...updates };
  } catch (error) {
    console.error('Error updating word:', error);
    throw error;
  }
}

/**
 * Delete a word
 */
export async function deleteWord(wordId) {
  try {
    const wordRef = doc(db, WORDS_COLLECTION, wordId);
    await deleteDoc(wordRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting word:', error);
    throw error;
  }
}

/**
 * Increment usage count for a word
 */
export async function incrementWordUsage(wordId) {
  try {
    const wordRef = doc(db, WORDS_COLLECTION, wordId);
    const wordDoc = await getDoc(wordRef);

    if (wordDoc.exists()) {
      const currentCount = wordDoc.data().usageCount || 0;
      await updateDoc(wordRef, {
        usageCount: currentCount + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing word usage:', error);
    // Don't throw error for usage count updates
  }
}
