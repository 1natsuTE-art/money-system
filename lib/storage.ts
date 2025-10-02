import { Transaction, Asset, Liability } from '@/types'

const STORAGE_KEYS = {
  TRANSACTIONS: 'money-system-transactions',
  ASSETS: 'money-system-assets',
  LIABILITIES: 'money-system-liabilities',
}

// Transaction storage
export const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
}

export const loadTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
  if (!data) return []

  try {
    const transactions = JSON.parse(data)
    // Date文字列をDateオブジェクトに変換
    return transactions.map((t: any) => ({
      ...t,
      date: new Date(t.date),
    }))
  } catch {
    return []
  }
}

// Asset storage
export const saveAssets = (assets: Asset[]) => {
  localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets))
}

export const loadAssets = (): Asset[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ASSETS)
  if (!data) return []

  try {
    const assets = JSON.parse(data)
    // Date文字列をDateオブジェクトに変換
    return assets.map((a: any) => ({
      ...a,
      lastUpdated: new Date(a.lastUpdated),
    }))
  } catch {
    return []
  }
}

// Liability storage
export const saveLiabilities = (liabilities: Liability[]) => {
  localStorage.setItem(STORAGE_KEYS.LIABILITIES, JSON.stringify(liabilities))
}

export const loadLiabilities = (): Liability[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LIABILITIES)
  if (!data) return []

  try {
    const liabilities = JSON.parse(data)
    // Date文字列をDateオブジェクトに変換
    return liabilities.map((l: any) => ({
      ...l,
      lastUpdated: new Date(l.lastUpdated),
    }))
  } catch {
    return []
  }
}

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })
}