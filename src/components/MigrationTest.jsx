import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import migrateWordsToFirestore from '../scripts/migrateToFirebase';
import { importAllNewWords } from '../scripts/bulkImport';
import { getAllWords } from '../services/wordService';

export default function MigrationTest() {
  const { user } = useAuth();
  const [status, setStatus] = useState('');
  const [wordCount, setWordCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Admin access control - only allow specific email
  const isAdmin = user?.email === 'polboy777@gmail.com';

  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleMigration = async () => {
    setLoading(true);
    setStatus('Starting migration...');

    try {
      const count = await migrateWordsToFirestore();
      if (count === 0) {
        setStatus('Migration cancelled - already completed');
      } else {
        setStatus(`✅ Migration complete! ${count} words added to Firestore`);
      }
    } catch (error) {
      setStatus(`❌ Migration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkImport = async () => {
    setLoading(true);
    setStatus('Starting bulk import of new words...');

    try {
      const result = await importAllNewWords();
      if (result.success) {
        setStatus(`✅ Bulk import complete! ${result.count} new words added with full metadata`);
        handleCheckWords(); // Auto-refresh word count
      } else {
        setStatus(`❌ Bulk import failed: ${result.error}`);
      }
    } catch (error) {
      setStatus(`❌ Bulk import failed: ${error.message}`);
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
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="font-bold text-yellow-800 dark:text-yellow-300">Admin Access Only</h3>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-2">
            Restricted to admin account: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">polboy777@gmail.com</code>
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gradient mb-6">Database Migration & Import</h2>

        <div className="space-y-4">
          <div className="card bg-blue-50/50 dark:bg-blue-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">Step 1: Migrate Default Words</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              One-time migration of 237 base words from MisspelledWords.js
            </p>
            <button
              onClick={handleMigration}
              disabled={loading}
              className="btn btn--primary"
            >
              {loading ? 'Migrating...' : 'Run Default Migration'}
            </button>
          </div>

          <div className="card bg-purple-50/50 dark:bg-purple-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">Step 2: Import New Words</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Import additional words with full metadata:
            </p>
            <ul className="text-sm text-slate-600 dark:text-slate-300 mb-4 list-disc list-inside space-y-1">
              <li>✨ 40 beginner words with definitions</li>
              <li>🎓 45 intermediate words with examples</li>
              <li>📝 Example sentences for every word</li>
              <li>⚠️ Common misspellings included</li>
              <li>🎯 Difficulty levels pre-assigned</li>
              <li>📊 Total: 85 new words</li>
            </ul>
            <button
              onClick={handleBulkImport}
              disabled={loading}
              className="btn btn--primary"
            >
              {loading ? 'Importing...' : 'Import New Words (85)'}
            </button>
          </div>

          <div className="card bg-green-50/50 dark:bg-green-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">Step 3: Verify Database</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Check total word count in Firestore
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
                📊 Total words in database: {wordCount}
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

          <div className="card bg-orange-50/50 dark:bg-orange-950/30 p-6">
            <h3 className="font-bold text-lg mb-2">⚠️ Important Notes</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li>Run default migration first (Step 1)</li>
              <li>Then import new words (Step 2)</li>
              <li>Migrations are protected against duplicates</li>
              <li>Check console for detailed logs</li>
              <li>This page is hidden from main navigation</li>
              <li>Bookmark this URL: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">/migrate</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
