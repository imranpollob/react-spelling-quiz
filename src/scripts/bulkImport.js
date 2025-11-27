import { db } from '../services/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import beginnerWords from '../data/wordSources/beginnerWords.json';
import intermediateWords from '../data/wordSources/intermediateWords.json';

/**
 * Bulk import words from JSON files to Firestore
 * This script imports additional words with rich metadata
 */

async function bulkImportWords(wordsArray, sourceName = 'bulk-import') {
  console.log(`Starting bulk import of ${wordsArray.length} words from ${sourceName}...`);

  const batchSize = 500; // Firestore batch limit
  let totalImported = 0;

  for (let i = 0; i < wordsArray.length; i += batchSize) {
    const wordsBatch = wordsArray.slice(i, i + batchSize);
    const batch = writeBatch(db);
    const wordsRef = collection(db, 'words');

    for (const wordData of wordsBatch) {
      const newDocRef = doc(wordsRef);

      batch.set(newDocRef, {
        word: wordData.word.toLowerCase().trim(),
        difficulty: wordData.difficulty || 'intermediate',
        category: wordData.category || 'general',
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
    }

    await batch.commit();
    console.log(`Imported ${totalImported} / ${wordsArray.length} words...`);
  }

  console.log(`✅ Bulk import complete! ${totalImported} words added to Firestore`);
  return totalImported;
}

/**
 * Import beginner words
 */
export async function importBeginnerWords() {
  return await bulkImportWords(beginnerWords, 'beginner-words-collection');
}

/**
 * Import intermediate words
 */
export async function importIntermediateWords() {
  return await bulkImportWords(intermediateWords, 'intermediate-words-collection');
}

/**
 * Main import function - call this from the UI
 */
export async function importAllNewWords() {
  let total = 0;

  try {
    console.log('Starting word import process...\n');

    const beginnerCount = await importBeginnerWords();
    total += beginnerCount;

    const intermediateCount = await importIntermediateWords();
    total += intermediateCount;

    console.log(`\n🎉 Total words imported: ${total}`);
    return { success: true, count: total };
  } catch (error) {
    console.error('Import failed:', error);
    return { success: false, error: error.message };
  }
}

export default bulkImportWords;
