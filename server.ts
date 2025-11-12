import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const items: { id: number; name: string }[] = []

app.get('/api/items', (req: Request, res: Response) => {
  res.json(items)
})

app.post('/api/items', (req: Request, res: Response) => {
  console.log('POST /api/items body:', req.body)
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name is required' })
  const newItem = { id: Date.now(), name }
  items.push(newItem)
  res.status(201).json(newItem)
})

app.put('/api/items/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name } = req.body
  const itemIndex = items.findIndex(item => item.id === id)
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' })
  items[itemIndex].name = name
  res.json(items[itemIndex])
})

app.delete('/api/items/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const itemIndex = items.findIndex(item => item.id === id)

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }

  const deletedItem = items.splice(itemIndex, 1)[0]
  res.json(deletedItem)
})

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))

export { app, items }
