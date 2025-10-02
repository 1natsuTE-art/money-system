export interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  date: Date
  type: 'income' | 'expense'
  tags?: string[]
}

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color?: string
  icon?: string
}

export interface Asset {
  id: string
  name: string
  type: 'cash' | 'bank' | 'investment' | 'property' | 'other'
  currentValue: number
  description?: string
  lastUpdated: Date
}

export interface Liability {
  id: string
  name: string
  type: 'loan' | 'credit_card' | 'mortgage' | 'other'
  currentBalance: number
  interestRate?: number
  description?: string
  lastUpdated: Date
}

export interface Budget {
  id: string
  categoryId: string
  amount: number
  period: 'monthly' | 'yearly'
}

export interface FinancialSummary {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  monthlyIncome: number
  monthlyExpenses: number
  monthlyBalance: number
}