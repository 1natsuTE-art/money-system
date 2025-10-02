'use client'
import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { Liability } from '@/types'

const liabilityTypes = [
  { value: 'loan', label: 'ローン' },
  { value: 'credit_card', label: 'クレジットカード' },
  { value: 'mortgage', label: '住宅ローン' },
  { value: 'other', label: 'その他' },
]

export default function LiabilityManager() {
  const [liabilities, setLiabilities] = useState<Liability[]>([])
  const [open, setOpen] = useState(false)
  const [editingLiability, setEditingLiability] = useState<Liability | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'loan' as Liability['type'],
    currentBalance: '',
    interestRate: '',
    description: '',
  })

  const handleOpen = (liability?: Liability) => {
    if (liability) {
      setEditingLiability(liability)
      setFormData({
        name: liability.name,
        type: liability.type,
        currentBalance: liability.currentBalance.toString(),
        interestRate: liability.interestRate?.toString() || '',
        description: liability.description || '',
      })
    } else {
      setEditingLiability(null)
      setFormData({
        name: '',
        type: 'loan',
        currentBalance: '',
        interestRate: '',
        description: '',
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingLiability(null)
  }

  const handleSubmit = () => {
    const liability: Liability = {
      id: editingLiability?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      currentBalance: parseFloat(formData.currentBalance),
      interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
      description: formData.description,
      lastUpdated: new Date(),
    }

    if (editingLiability) {
      setLiabilities(liabilities.map(l => l.id === editingLiability.id ? liability : l))
    } else {
      setLiabilities([...liabilities, liability])
    }

    handleClose()
  }

  const handleDelete = (id: string) => {
    setLiabilities(liabilities.filter(l => l.id !== id))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP').format(date)
  }

  const getLiabilityTypeLabel = (type: Liability['type']) => {
    return liabilityTypes.find(t => t.value === type)?.label || type
  }

  const getTotalLiabilities = () => {
    return liabilities.reduce((total, liability) => total + liability.currentBalance, 0)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          負債管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          新規負債
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          負債合計
        </Typography>
        <Typography variant="h4" color="error.main">
          {formatCurrency(getTotalLiabilities())}
        </Typography>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>負債名</TableCell>
              <TableCell>種別</TableCell>
              <TableCell>説明</TableCell>
              <TableCell align="right">残高</TableCell>
              <TableCell align="right">金利</TableCell>
              <TableCell>最終更新</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {liabilities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  負債データがありません
                </TableCell>
              </TableRow>
            ) : (
              liabilities.map((liability) => (
                <TableRow key={liability.id}>
                  <TableCell>{liability.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={getLiabilityTypeLabel(liability.type)}
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{liability.description}</TableCell>
                  <TableCell align="right">
                    <Typography color="error.main">
                      {formatCurrency(liability.currentBalance)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {liability.interestRate ? `${liability.interestRate}%` : '-'}
                  </TableCell>
                  <TableCell>{formatDate(liability.lastUpdated)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(liability)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(liability.id)} size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingLiability ? '負債を編集' : '新規負債'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="負債名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>種別</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Liability['type'] })}
              >
                {liabilityTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="残高"
              type="number"
              value={formData.currentBalance}
              onChange={(e) => setFormData({ ...formData, currentBalance: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="金利 (%)"
              type="number"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="説明"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.currentBalance}
          >
            {editingLiability ? '更新' : '追加'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}