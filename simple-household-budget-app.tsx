import React, { useState, useEffect } from 'react';
import { Plus, Wallet, TrendingUp, TrendingDown, Edit2, Trash2, Calendar } from 'lucide-react';

const SimpleHouseholdBudgetApp = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  // フォーム状態
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    memo: '',
    date: new Date().toISOString().split('T')[0]
  });

  // カテゴリ定義
  const expenseCategories = ['食費', '交通費', '娯楽', '日用品', '光熱費', '医療費', 'その他'];
  const incomeCategories = ['給与', 'ボーナス', '副収入', 'その他'];

  // 初期データ
  useEffect(() => {
    const initialData = [
      { id: 1, type: 'income', amount: 250000, category: '給与', memo: '基本給', date: '2024-09-01' },
      { id: 2, type: 'expense', amount: 3500, category: '食費', memo: 'スーパー', date: '2024-09-10' },
      { id: 3, type: 'expense', amount: 1200, category: '交通費', memo: '電車代', date: '2024-09-11' },
      { id: 4, type: 'expense', amount: 2800, category: '娯楽', memo: '映画', date: '2024-09-12' }
    ];
    setTransactions(initialData);
  }, []);

  // 取引追加・編集
  const handleSubmit = () => {
    if (!formData.amount || !formData.category) {
      alert('金額とカテゴリは必須です');
      return;
    }
    
    const newTransaction = {
      id: editingTransaction ? editingTransaction.id : Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingTransaction) {
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? newTransaction : t));
    } else {
      setTransactions(prev => [...prev, newTransaction]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      memo: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
    setEditingTransaction(null);
  };

  // 削除機能
  const deleteTransaction = (id) => {
    if (confirm('この取引を削除しますか？')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  // 編集機能
  const editTransaction = (transaction) => {
    setFormData(transaction);
    setEditingTransaction(transaction);
    setShowAddForm(true);
  };

  // 統計計算
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // 今月のデータ
  const currentMonth = new Date().toISOString().substring(0, 7);
  const thisMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  const thisMonthIncome = thisMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const thisMonthExpense = thisMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">シンプル家計簿</h1>
          <p className="text-gray-600">毎日の収支を簡単に記録</p>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">今月の収入</p>
                <p className="text-2xl font-bold">¥{thisMonthIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">今月の支出</p>
                <p className="text-2xl font-bold">¥{thisMonthExpense.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-200" />
            </div>
          </div>
          
          <div className={`${balance >= 0 ? 'bg-blue-500' : 'bg-orange-500'} text-white rounded-lg p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">残高</p>
                <p className="text-2xl font-bold">¥{balance.toLocaleString()}</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-200" />
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* ヘッダー */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">取引履歴</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              {showAddForm ? 'キャンセル' : '新規追加'}
            </button>
          </div>

          {/* 追加フォーム */}
          {showAddForm && (
            <div className="p-6 border-b bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {editingTransaction ? '取引を編集' : '新しい取引を追加'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">種類</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value, category: '' }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="expense">支出</option>
                    <option value="income">収入</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">金額</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    {(formData.type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
                  <input
                    type="text"
                    value={formData.memo}
                    onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="メモ（任意）"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {editingTransaction ? '更新' : '追加'}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {/* 取引一覧 */}
          <div className="p-6">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">取引履歴がありません</p>
                <p className="text-sm text-gray-400">「新規追加」ボタンから記録を始めましょう</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'income' ? '収入' : '支出'}
                          </span>
                          <span className="font-medium text-gray-800">{transaction.category}</span>
                          <span className="text-sm text-gray-500">{transaction.date}</span>
                        </div>
                        {transaction.memo && (
                          <p className="text-sm text-gray-600">{transaction.memo}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                        </span>
                        
                        <div className="flex gap-1">
                          <button
                            onClick={() => editTransaction(transaction)}
                            className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* 簡単な統計 */}
        {transactions.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">今月のカテゴリ別支出</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {expenseCategories.map(category => {
                const categoryTotal = thisMonthTransactions
                  .filter(t => t.type === 'expense' && t.category === category)
                  .reduce((sum, t) => sum + t.amount, 0);
                
                if (categoryTotal === 0) return null;
                
                return (
                  <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{category}</p>
                    <p className="text-lg font-bold text-red-600">¥{categoryTotal.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleHouseholdBudgetApp;