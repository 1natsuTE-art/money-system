'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
// Using Box with flexbox instead of Grid for better compatibility
import {
  Add as AddIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  memo: string;
  date: string;
}

interface FormData {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  memo: string;
  date: string;
}

const HouseholdBudget = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [formData, setFormData] = useState<FormData>({
    type: 'expense',
    amount: '',
    category: '',
    memo: '',
    date: new Date().toISOString().split('T')[0]
  });

  const expenseCategories = ['食費', '交通費', '娯楽', '日用品', '光熱費', '医療費', 'その他'];
  const incomeCategories = ['給与', 'ボーナス', '副収入', 'その他'];

  useEffect(() => {
    const initialData: Transaction[] = [
      { id: 1, type: 'income', amount: 250000, category: '給与', memo: '基本給', date: '2024-09-01' },
      { id: 2, type: 'expense', amount: 3500, category: '食費', memo: 'スーパー', date: '2024-09-10' },
      { id: 3, type: 'expense', amount: 1200, category: '交通費', memo: '電車代', date: '2024-09-11' },
      { id: 4, type: 'expense', amount: 2800, category: '娯楽', memo: '映画', date: '2024-09-12' }
    ];
    setTransactions(initialData);
  }, []);

  const handleSubmit = () => {
    if (!formData.amount || !formData.category) {
      alert('金額とカテゴリは必須です');
      return;
    }

    const newTransaction: Transaction = {
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

  const deleteTransaction = (id: number) => {
    if (confirm('この取引を削除しますか？')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const editTransaction = (transaction: Transaction) => {
    setFormData({
      ...transaction,
      amount: transaction.amount.toString()
    });
    setEditingTransaction(transaction);
    setShowAddForm(true);
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const currentMonth = new Date().toISOString().substring(0, 7);
  const thisMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  const thisMonthIncome = thisMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const thisMonthExpense = thisMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'grey.800', mb: 1 }}>
            シンプル家計簿
          </Typography>
          <Typography variant="h6" color="text.secondary">
            毎日の収支を簡単に記録
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mb: 4
        }}>
          <Box sx={{ flex: 1 }}>
            <Card sx={{ bgcolor: 'success.main', color: 'white', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'success.light', mb: 1 }}>
                      今月の収入
                    </Typography>
                    <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                      ¥{thisMonthIncome.toLocaleString()}
                    </Typography>
                  </Box>
                  <TrendingUpIcon sx={{ fontSize: 32, color: 'success.light' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card sx={{ bgcolor: 'error.main', color: 'white', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'error.light', mb: 1 }}>
                      今月の支出
                    </Typography>
                    <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                      ¥{thisMonthExpense.toLocaleString()}
                    </Typography>
                  </Box>
                  <TrendingDownIcon sx={{ fontSize: 32, color: 'error.light' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card sx={{
              bgcolor: balance >= 0 ? 'primary.main' : 'warning.main',
              color: 'white',
              boxShadow: 3
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'primary.light', mb: 1 }}>
                      残高
                    </Typography>
                    <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                      ¥{balance.toLocaleString()}
                    </Typography>
                  </Box>
                  <WalletIcon sx={{ fontSize: 32, color: 'primary.light' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Paper sx={{ boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'grey.800' }}>
              取引履歴
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddForm(!showAddForm)}
              sx={{ textTransform: 'none' }}
            >
              {showAddForm ? 'キャンセル' : '新規追加'}
            </Button>
          </Box>
          <Divider />

          {showAddForm && (
            <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                {editingTransaction ? '取引を編集' : '新しい取引を追加'}
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 2,
                mb: 2,
                flexWrap: 'wrap'
              }}>
                <Box sx={{ flex: { lg: '1 1 20%' }, minWidth: '200px' }}>
                  <FormControl fullWidth>
                    <InputLabel>種類</InputLabel>
                    <Select
                      value={formData.type}
                      label="種類"
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'income' | 'expense', category: '' }))}
                    >
                      <MenuItem value="expense">支出</MenuItem>
                      <MenuItem value="income">収入</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: { lg: '1 1 20%' }, minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="金額"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                  />
                </Box>

                <Box sx={{ flex: { lg: '1 1 20%' }, minWidth: '200px' }}>
                  <FormControl fullWidth>
                    <InputLabel>カテゴリ</InputLabel>
                    <Select
                      value={formData.category}
                      label="カテゴリ"
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <MenuItem value="">選択してください</MenuItem>
                      {(formData.type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: { lg: '1 1 20%' }, minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="日付"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>

                <Box sx={{ flex: { lg: '1 1 20%' }, minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="メモ"
                    value={formData.memo}
                    onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
                    placeholder="メモ（任意）"
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ textTransform: 'none' }}
                >
                  {editingTransaction ? '更新' : '追加'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  sx={{ textTransform: 'none' }}
                >
                  キャンセル
                </Button>
              </Box>
            </Box>
          )}
          <Divider />

          <Box sx={{ p: 3 }}>
            {transactions.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CalendarIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  取引履歴がありません
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  「新規追加」ボタンから記録を始めましょう
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {transactions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(transaction => (
                    <Paper
                      key={transaction.id}
                      elevation={1}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '&:hover': { bgcolor: 'grey.50' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                          <Chip
                            label={transaction.type === 'income' ? '収入' : '支出'}
                            size="small"
                            color={transaction.type === 'income' ? 'success' : 'error'}
                            variant="outlined"
                          />
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {transaction.category}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {transaction.date}
                          </Typography>
                        </Box>
                        {transaction.memo && (
                          <Typography variant="body2" color="text.secondary">
                            {transaction.memo}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            color: transaction.type === 'income' ? 'success.main' : 'error.main'
                          }}
                        >
                          {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                        </Typography>

                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => editTransaction(transaction)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
              </Box>
            )}
          </Box>
        </Paper>

        {transactions.length > 0 && (
          <Paper sx={{ mt: 4, p: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'grey.800', mb: 2 }}>
              今月のカテゴリ別支出
            </Typography>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2
            }}>
              {expenseCategories.map(category => {
                const categoryTotal = thisMonthTransactions
                  .filter(t => t.type === 'expense' && t.category === category)
                  .reduce((sum, t) => sum + t.amount, 0);

                if (categoryTotal === 0) return null;

                return (
                  <Box key={category} sx={{ flex: { xs: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {category}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                        ¥{categoryTotal.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default HouseholdBudget;