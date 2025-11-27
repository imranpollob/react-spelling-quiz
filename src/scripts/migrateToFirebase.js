import { db } from '../services/firebase';
import { collection, writeBatch, doc, setDoc, getDoc } from 'firebase/firestore';
import words from '../data/words';

/**
 * Migration script to move existing words from words.js to Firestore
 * This is a one-time operation to populate the initial word database
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

async function migrateToFirebase() {
  console.log('Checking if migration has already been run...');

  // Check if migration has already been completed
  try {
    const migrationStatusRef = doc(db, '_system', 'migration_status');
    const migrationStatusDoc = await getDoc(migrationStatusRef);

    if (migrationStatusDoc.exists() && migrationStatusDoc.data().defaultWordsImported) {
      console.warn('⚠️ Migration has already been completed!');
      console.log('Migration date:', migrationStatusDoc.data().importDate?.toDate());
      console.log('Words imported:', migrationStatusDoc.data().wordCount);

      const confirmRemigrate = window.confirm(
        'Migration has already been run. Running it again will create duplicate words. Continue anyway?'
      );

      if (!confirmRemigrate) {
        console.log('Migration cancelled by user');
        return 0;
      }
    }
  } catch (error) {
    console.log('No previous migration found, proceeding...');
  }

  console.log('Starting migration of', words.length, 'words to Firestore...');

  const batch = writeBatch(db);
  const wordsRef = collection(db, 'words');
  let count = 0;

  // Process words in batches of 500 (Firestore limit)
  const batchSize = 500;

  for (let i = 0; i < words.length; i += batchSize) {
    const wordsBatch = words.slice(i, i + batchSize);
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
        difficultyScore: 0.5,
        // Access control - all default words are global
        isGlobal: true,
        userId: null,
        createdBy: 'system'
      });

      count++;
    }

    await currentBatch.commit();
    console.log(`Migrated ${count} / ${words.length} words...`);
  }

  // Mark migration as completed
  const migrationStatusRef = doc(db, '_system', 'migration_status');
  await setDoc(migrationStatusRef, {
    defaultWordsImported: true,
    importDate: new Date(),
    wordCount: count,
    source: 'words.js'
  });

  console.log('✅ Migration complete!', count, 'words added to Firestore');
  return count;
}

// Export for use in browser console or as a script
export default migrateToFirebase;

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
