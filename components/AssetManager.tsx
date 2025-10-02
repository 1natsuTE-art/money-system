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
import { Asset } from '@/types'

const assetTypes = [
  { value: 'cash', label: '現金' },
  { value: 'bank', label: '銀行預金' },
  { value: 'investment', label: '投資' },
  { value: 'property', label: '不動産' },
  { value: 'other', label: 'その他' },
]

export default function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [open, setOpen] = useState(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'bank' as Asset['type'],
    currentValue: '',
    description: '',
  })

  const handleOpen = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset)
      setFormData({
        name: asset.name,
        type: asset.type,
        currentValue: asset.currentValue.toString(),
        description: asset.description || '',
      })
    } else {
      setEditingAsset(null)
      setFormData({
        name: '',
        type: 'bank',
        currentValue: '',
        description: '',
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingAsset(null)
  }

  const handleSubmit = () => {
    const asset: Asset = {
      id: editingAsset?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      currentValue: parseFloat(formData.currentValue),
      description: formData.description,
      lastUpdated: new Date(),
    }

    if (editingAsset) {
      setAssets(assets.map(a => a.id === editingAsset.id ? asset : a))
    } else {
      setAssets([...assets, asset])
    }

    handleClose()
  }

  const handleDelete = (id: string) => {
    setAssets(assets.filter(a => a.id !== id))
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

  const getAssetTypeLabel = (type: Asset['type']) => {
    return assetTypes.find(t => t.value === type)?.label || type
  }

  const getTotalAssets = () => {
    return assets.reduce((total, asset) => total + asset.currentValue, 0)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          資産管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          新規資産
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          資産合計
        </Typography>
        <Typography variant="h4" color="success.main">
          {formatCurrency(getTotalAssets())}
        </Typography>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>資産名</TableCell>
              <TableCell>種別</TableCell>
              <TableCell>説明</TableCell>
              <TableCell align="right">現在価値</TableCell>
              <TableCell>最終更新</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  資産データがありません
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={getAssetTypeLabel(asset.type)}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{asset.description}</TableCell>
                  <TableCell align="right">
                    <Typography color="success.main">
                      {formatCurrency(asset.currentValue)}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(asset.lastUpdated)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(asset)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(asset.id)} size="small">
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
          {editingAsset ? '資産を編集' : '新規資産'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="資産名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>種別</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Asset['type'] })}
              >
                {assetTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="現在価値"
              type="number"
              value={formData.currentValue}
              onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
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
            disabled={!formData.name || !formData.currentValue}
          >
            {editingAsset ? '更新' : '追加'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}