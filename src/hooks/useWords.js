import { useState, useEffect } from 'react';
import { getAllWords } from '../services/wordService';

/**
 * Custom hook to fetch and cache words from Firestore
 */
export function useWords() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWords() {
      try {
        // Check session cache first
        const cachedWords = sessionStorage.getItem('words_cache');
        const cacheTimestamp = sessionStorage.getItem('words_cache_timestamp');
        const now = Date.now();

        // Use cache if less than 5 minutes old
        if (cachedWords && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 5 * 60 * 1000) {
          setWords(JSON.parse(cachedWords));
          setLoading(false);
          return;
        }

        // Fetch from Firestore
        const wordsData = await getAllWords();
        setWords(wordsData);

        // Cache the results
        sessionStorage.setItem('words_cache', JSON.stringify(wordsData));
        sessionStorage.setItem('words_cache_timestamp', now.toString());

        setLoading(false);
      } catch (err) {
        console.error('Error fetching words:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchWords();
  }, []);

  const refreshWords = async () => {
    setLoading(true);
    try {
      const wordsData = await getAllWords();
      setWords(wordsData);
      sessionStorage.setItem('words_cache', JSON.stringify(wordsData));
      sessionStorage.setItem('words_cache_timestamp', Date.now().toString());
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { words, loading, error, refreshWords };
}
