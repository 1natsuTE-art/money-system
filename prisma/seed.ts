import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 既存のデータを削除
  await prisma.transaction.deleteMany()

  // 初期データを挿入
  const transactions = [
    {
      type: 'income',
      amount: 250000,
      category: '給与',
      memo: '基本給',
      date: new Date('2024-09-01')
    },
    {
      type: 'expense',
      amount: 3500,
      category: '食費',
      memo: 'スーパー',
      date: new Date('2024-09-10')
    },
    {
      type: 'expense',
      amount: 1200,
      category: '交通費',
      memo: '電車代',
      date: new Date('2024-09-11')
    },
    {
      type: 'expense',
      amount: 2800,
      category: '娯楽',
      memo: '映画',
      date: new Date('2024-09-12')
    },
    {
      type: 'income',
      amount: 50000,
      category: 'ボーナス',
      memo: '四半期ボーナス',
      date: new Date('2024-10-01')
    },
    {
      type: 'expense',
      amount: 5000,
      category: '食費',
      memo: 'レストラン',
      date: new Date('2024-10-02')
    }
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction
    })
  }

  console.log('データベースに初期データを挿入しました。')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })