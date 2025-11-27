import { db } from '../services/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { misspelled } from '../helper-functions/MisspelledWords';

/**
 * Migration script to move existing words from MisspelledWords.js to Firestore
 * Run this once to populate the database with initial words
 */

// Difficulty assignment helper (simple algorithm based on word length and complexity)
function assignDifficulty(word) {
  const length = word.length;

  // Common difficult patterns
  const hardPatterns = ['ie', 'ei', 'ough', 'augh', 'double consonants'];
  const hasHardPattern = hardPatterns.some(pattern => word.includes(pattern));

  if (length <= 6 && !hasHardPattern) return 'beginner';
  if (length <= 9 || (length <= 11 && !hasHardPattern)) return 'intermediate';
  return 'advanced';
}

async function migrateWordsToFirestore() {
  console.log('Starting migration of', misspelled.length, 'words to Firestore...');

  const batch = writeBatch(db);
  const wordsRef = collection(db, 'words');
  let count = 0;

  // Process words in batches of 500 (Firestore limit)
  const batchSize = 500;

  for (let i = 0; i < misspelled.length; i += batchSize) {
    const wordsBatch = misspelled.slice(i, i + batchSize);
    const currentBatch = writeBatch(db);

    for (const word of wordsBatch) {
      const cleanWord = word.trim().toLowerCase();
      const newDocRef = doc(wordsRef);

      currentBatch.set(newDocRef, {
        word: cleanWord,
        difficulty: assignDifficulty(cleanWord),
        category: 'commonly-misspelled',
        definition: '', // To be filled later with API data
        exampleSentence: '',
        commonMistakes: [],
        syllables: '',
        phonetic: '',
        etymology: '',
        partOfSpeech: '',
        synonyms: [],
        tags: ['default'],
        addedDate: new Date(),
        source: 'default',
        verified: true,
        usageCount: 0,
        difficultyScore: 0.5
      });

      count++;
    }

    await currentBatch.commit();
    console.log(`Migrated ${count} / ${misspelled.length} words...`);
  }

  console.log('✅ Migration complete!', count, 'words added to Firestore');
  return count;
}

// Export for use in browser console or as a script
export default migrateWordsToFirestore;

// If running as a Node script (uncomment to use)
// migrateWordsToFirestore()
//   .then(count => {
//     console.log('Success! Migrated', count, 'words');
//     process.exit(0);
//   })
//   .catch(error => {
//     console.error('Migration failed:', error);
//     process.exit(1);
//   });
