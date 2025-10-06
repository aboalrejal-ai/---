import { useState, useCallback, useMemo } from 'react'
import { SearchResult } from '../types'
import { debounce } from '../utils'

// تعريف أنواع البيانات للبحث
type SearchableItem = {
  id: string
  [key: string]: any
}

type DataType = 'user' | 'event' | 'surah' | 'attendance' | 'recitation'

const getDataType = (index: number): DataType => {
  const types: DataType[] = ['user', 'event', 'surah', 'attendance', 'recitation']
  return types[index] || 'user'
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // البحث في البيانات
  const searchInData = useCallback(async (
    query: string,
    ...dataArrays: SearchableItem[][]
  ): Promise<SearchResult[]> => {
    if (!query.trim()) {
      setSearchResults([])
      return []
    }

    setIsSearching(true)

    try {
      const results: SearchResult[] = []

      dataArrays.forEach((dataArray, index) => {
        const filtered = dataArray.filter(item => {
          return Object.values(item).some(value => {
            if (value == null) return false
            return String(value).toLowerCase().includes(query.toLowerCase())
          })
        })

        filtered.forEach(item => {
          results.push({
            id: item.id,
            title: getDisplayTitle(item, getDataType(index)),
            type: getDataType(index),
            data: item
          })
        })
      })

      setSearchResults(results)
      return results
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      return []
    } finally {
      setIsSearching(false)
    }
  }, [])

  // البحث المُؤجل (debounced search)
  const debouncedSearch = useMemo(
    () => debounce(searchInData, 300),
    [searchInData]
  )

  // مسح نتائج البحث
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
  }, [])

  // تحديث استعلام البحث
  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)

    if (query.trim()) {
      debouncedSearch(query)
    } else {
      clearSearch()
    }
  }, [debouncedSearch, clearSearch])

  return {
    searchQuery,
    setSearchQuery: updateSearchQuery,
    searchResults,
    searchInData,
    clearSearch,
    isSearching,
    hasResults: searchResults.length > 0,
    resultCount: searchResults.length
  }
}

// دالة مساعدة للحصول على العنوان المناسب للعرض
const getDisplayTitle = (item: SearchableItem, type: DataType): string => {
  switch (type) {
    case 'user':
      return item.name || item.email || `مستخدم ${item.id}`
    case 'event':
      return item.title || `فعالية ${item.id}`
    case 'surah':
      return item.name || `سورة ${item.id}`
    case 'attendance':
      return `حضور ${item.date || item.id}`
    case 'recitation':
      return `تسميع ${item.surah_id || item.id}`
    default:
      return `عنصر ${item.id}`
  }
}