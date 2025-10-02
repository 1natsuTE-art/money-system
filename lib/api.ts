export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  memo: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  memo?: string;
  date?: string;
}

const API_BASE_URL = '/api';

export const transactionApi = {
  // 全てのトランザクションを取得
  async getAll(): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  },

  // 特定のトランザクションを取得
  async getById(id: number): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transaction');
    }
    return response.json();
  },

  // 新しいトランザクションを作成
  async create(data: CreateTransactionData): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    return response.json();
  },

  // トランザクションを更新
  async update(id: number, data: CreateTransactionData): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update transaction');
    }
    return response.json();
  },

  // トランザクションを削除
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }
  },
};