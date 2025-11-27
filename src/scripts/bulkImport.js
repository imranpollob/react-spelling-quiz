import { db } from '../services/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import words from '../data/words';

/**
 * Bulk import words from words.js into Firestore
 * @param {Array} wordList - Array of word strings
 * @param {string} sourceName - Source identifier for tracking
 */
async function bulkImportWords(wordList, sourceName) {
  const wordsRef = collection(db, 'words');
  let batch = writeBatch(db);
  let totalImported = 0;
  const BATCH_SIZE = 500;

  for (let i = 0; i < wordList.length; i++) {
    const wordText = typeof wordList[i] === 'string' ? wordList[i] : wordList[i].word;
    const wordData = typeof wordList[i] === 'string'
      ? { word: wordText }
      : wordList[i];

    const newDocRef = doc(wordsRef);

    batch.set(newDocRef, {
      word: wordText.toLowerCase().trim(),
      difficulty: wordData.difficulty || 'intermediate',
      category: wordData.category || 'commonly-misspelled',
      definition: wordData.definition || '',
      exampleSentence: wordData.exampleSentence || '',
      commonMistakes: wordData.commonMistakes || [],
      syllables: wordData.syllables || '',
      phonetic: wordData.phonetic || '',
      etymology: wordData.etymology || '',
      partOfSpeech: wordData.partOfSpeech || '',
      synonyms: wordData.synonyms || [],
      tags: wordData.tags || [],
      addedDate: new Date(),
      source: sourceName,
      verified: true,
      usageCount: 0,
      difficultyScore: 0.5,
      // Access control - bulk imported words are global
      isGlobal: true,
      userId: null,
      createdBy: 'system'
    });

    totalImported++;

    // Commit batch every BATCH_SIZE documents
    if ((i + 1) % BATCH_SIZE === 0) {
      await batch.commit();
      console.log(`Imported ${i + 1} words...`);
      batch = writeBatch(db);
    }
  }

  // Commit remaining documents
  if (totalImported % BATCH_SIZE !== 0) {
    await batch.commit();
  }

  return totalImported;
}

/**
 * Import all words from words.js
 */
export async function importAllWords() {
  console.log('Starting bulk import of all words...');

  try {
    const wordCount = await bulkImportWords(words, 'words.js');

    console.log(`✅ Successfully imported ${wordCount} words total`);
    return { success: true, totalImported: wordCount };
  } catch (error) {
    console.error('Error importing words:', error);
    throw error;
  }
}

export default importAllWords;
