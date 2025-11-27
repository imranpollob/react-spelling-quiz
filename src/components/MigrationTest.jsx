import React, { useState } from 'react';
import migrateWordsToFirestore from '../scripts/migrateToFirebase';
import { getAllWords } from '../services/wordService';

export default function MigrationTest() {
  const [status, setStatus] = useState('');
  const [wordCount, setWordCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMigration = async () => {
    setLoading(true);
    setStatus('Starting migration...');

    try {
      const count = await migrateWordsToFirestore();
      setStatus(`✅ Migration complete! ${count} words added to Firestore`);
    } catch (error) {
      setStatus(`❌ Migration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckWords = async () => {
    setLoading(true);
    setStatus('Fetching words from Firestore...');

    try {
      const words = await getAllWords();
      setWordCount(words.length);
      setStatus(`✅ Found ${words.length} words in Firestore`);
    } catch (error) {
      setStatus(`❌ Failed to fetch words: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full glass rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-gradient mb-6">Database Migration</h2>

        <div className="space-y-4">
          <div className="card bg-blue-50/50 dark:bg-blue-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">Step 1: Migrate Words</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Click this button once to migrate {'"237"'} words to Firestore
            </p>
            <button
              onClick={handleMigration}
              disabled={loading}
              className="btn btn--primary"
            >
              {loading ? 'Migrating...' : 'Run Migration'}
            </button>
          </div>

          <div className="card bg-green-50/50 dark:bg-green-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">Step 2: Verify Words</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Check how many words are in Firestore
            </p>
            <button
              onClick={handleCheckWords}
              disabled={loading}
              className="btn btn--success"
            >
              {loading ? 'Checking...' : 'Check Word Count'}
            </button>
            {wordCount !== null && (
              <p className="mt-3 font-bold text-emerald-600 dark:text-emerald-400">
                Words in database: {wordCount}
              </p>
            )}
          </div>

          {status && (
            <div className={`card p-6 ${status.includes('❌') ? 'bg-red-50/50 dark:bg-red-950/30' :
                'bg-green-50/50 dark:bg-green-950/30'
              }`}>
              <h3 className="font-bold text-lg mb-2">Status</h3>
              <p className="text-sm whitespace-pre-wrap">{status}</p>
            </div>
          )}

          <div className="card bg-purple-50/50 dark:bg-purple-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">⚠️ Important Notes</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li>Only run the migration once to avoid duplicates</li>
              <li>Make sure you're authenticated before running</li>
              <li>Check the browser console for detailed logs</li>
              <li>After successful migration, you can remove this test page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
