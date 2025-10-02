'use client'
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
} from '@mui/icons-material'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'error'
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ color: `${color}.main`, mr: 1 }}>{icon}</Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" color={`${color}.main`}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  // TODO: これらの値は実際のデータから取得する
  const stats = {
    totalAssets: 1500000,
    totalLiabilities: 500000,
    netWorth: 1000000,
    monthlyIncome: 300000,
    monthlyExpenses: 200000,
    monthlyBalance: 100000,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount)
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        財務概要
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="純資産"
            value={formatCurrency(stats.netWorth)}
            icon={<AccountBalance />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="総資産"
            value={formatCurrency(stats.totalAssets)}
            icon={<TrendingUp />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="総負債"
            value={formatCurrency(stats.totalLiabilities)}
            icon={<TrendingDown />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="今月の収支"
            value={formatCurrency(stats.monthlyBalance)}
            icon={<Receipt />}
            color={stats.monthlyBalance >= 0 ? 'success' : 'error'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              今月の収支
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">収入</Typography>
                <Typography variant="body1" color="success.main">
                  {formatCurrency(stats.monthlyIncome)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">支出</Typography>
                <Typography variant="body1" color="error.main">
                  {formatCurrency(stats.monthlyExpenses)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6">差額</Typography>
                <Typography
                  variant="h6"
                  color={stats.monthlyBalance >= 0 ? 'success.main' : 'error.main'}
                >
                  {formatCurrency(stats.monthlyBalance)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              資産・負債内訳
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">総資産</Typography>
                <Typography variant="body1" color="success.main">
                  {formatCurrency(stats.totalAssets)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">総負債</Typography>
                <Typography variant="body1" color="error.main">
                  {formatCurrency(stats.totalLiabilities)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6">純資産</Typography>
                <Typography variant="h6" color="primary.main">
                  {formatCurrency(stats.netWorth)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}