'use client'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material'

export default function BalanceSheet() {
  // TODO: 実際のデータを取得する
  const mockAssets = [
    { name: '普通預金', value: 500000 },
    { name: '定期預金', value: 1000000 },
    { name: '投資信託', value: 300000 },
  ]

  const mockLiabilities = [
    { name: 'クレジットカード', value: 50000 },
    { name: '自動車ローン', value: 200000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount)
  }

  const totalAssets = mockAssets.reduce((sum, asset) => sum + asset.value, 0)
  const totalLiabilities = mockLiabilities.reduce((sum, liability) => sum + liability.value, 0)
  const netWorth = totalAssets - totalLiabilities

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        バランスシート
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        {new Date().toLocaleDateString('ja-JP')} 現在
      </Typography>

      <Grid container spacing={3}>
        {/* 資産 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="success.main">
              資産
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>項目</TableCell>
                    <TableCell align="right">金額</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockAssets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell align="right">{formatCurrency(asset.value)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Divider />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">資産合計</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="success.main">
                        {formatCurrency(totalAssets)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* 負債 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="error.main">
              負債
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>項目</TableCell>
                    <TableCell align="right">金額</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockLiabilities.map((liability, index) => (
                    <TableRow key={index}>
                      <TableCell>{liability.name}</TableCell>
                      <TableCell align="right">{formatCurrency(liability.value)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Divider />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">負債合計</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="error.main">
                        {formatCurrency(totalLiabilities)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* 純資産 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              純資産
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">
                資産合計 - 負債合計
              </Typography>
              <Typography variant="h4" color={netWorth >= 0 ? 'success.main' : 'error.main'}>
                {formatCurrency(netWorth)}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'text.secondary' }}>
              <span>{formatCurrency(totalAssets)} - {formatCurrency(totalLiabilities)}</span>
            </Box>
          </Paper>
        </Grid>

        {/* 資産・負債比率 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              財務指標
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    資産負債比率
                  </Typography>
                  <Typography variant="h6">
                    {totalLiabilities > 0 ? ((totalLiabilities / totalAssets) * 100).toFixed(1) : 0}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    純資産比率
                  </Typography>
                  <Typography variant="h6">
                    {totalAssets > 0 ? ((netWorth / totalAssets) * 100).toFixed(1) : 0}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    流動性比率
                  </Typography>
                  <Typography variant="h6">
                    {totalLiabilities > 0 ? (totalAssets / totalLiabilities).toFixed(2) : '∞'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}