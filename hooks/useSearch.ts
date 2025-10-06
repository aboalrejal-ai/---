import { useState, useCallback } from 'react';
import { SearchResult, UseSearchReturn } from '../types';

export const useSearch = (): UseSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const searchInData = useCallback((query: string, ...dataArrays: any[][]) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    dataArrays.forEach((dataArray, arrayIndex) => {
      if (!Array.isArray(dataArray)) return;

      dataArray.forEach((item) => {
        if (!item || typeof item !== 'object') return;

        // Search in all string properties of the item
        const matches = Object.entries(item).some(([key, value]) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerQuery);
          }
          return false;
        });

        if (matches) {
          // Determine the type based on array index or item properties
          let type: SearchResult['type'] = 'user';
          if (item.hasOwnProperty('userId') && item.hasOwnProperty('date')) {
            type = 'attendance';
          } else if (item.hasOwnProperty('type') && item.hasOwnProperty('description')) {
            if (item.hasOwnProperty('severity')) {
              type = 'violation';
            } else {
              type = 'event';
            }
          }

          results.push({
            id: item.id || `${arrayIndex}-${Math.random()}`,
            type,
            title: item.name || item.title || item.description || 'عنصر غير محدد',
            description: item.email || item.location || item.type || '',
            data: item,
          });
        }
      });
    });

    setSearchResults(results);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchInData,
    clearSearch,
  };
};