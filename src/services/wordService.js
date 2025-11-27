import { db } from './firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

const WORDS_COLLECTION = 'words';
const ADMIN_EMAIL = 'polboy777@gmail.com';

/**
 * Get all words from Firestore (global + user-specific)
 * @param {string} userId - Current user's ID
 */
export async function getAllWords(userId = null) {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const snapshot = await getDocs(wordsRef);
    const allWords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter: return global words + words created by this user
    return allWords.filter(word =>
      word.isGlobal || word.userId === userId
    );
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
 * @param {object} wordData - Word data
 * @param {string} userId - User ID adding the word
 * @param {string} userEmail - User email to check if admin
 */
export async function addWord(wordData, userId, userEmail) {
  try {
    const wordsRef = collection(db, WORDS_COLLECTION);
    const newDocRef = doc(wordsRef);

    // Check if user is admin
    const isAdmin = userEmail === ADMIN_EMAIL;

    const wordDocument = {
      ...wordData,
      word: wordData.word.toLowerCase().trim(),
      addedDate: new Date(),
      source: isAdmin ? 'admin' : 'user-contributed',
      verified: isAdmin, // Admin words are auto-verified
      usageCount: 0,
      category: wordData.category || 'custom',
      difficulty: wordData.difficulty || 'intermediate',
      // Access control fields
      isGlobal: isAdmin, // Only admin words are global
      userId: isAdmin ? null : userId, // Admin words don't have userId
      createdBy: userEmail
    };

    await setDoc(newDocRef, wordDocument);

    return { id: newDocRef.id, ...wordData };
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
