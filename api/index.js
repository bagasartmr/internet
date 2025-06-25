import { Hono } from 'hono';

const app = new Hono();

app.post('/api/products', async (c) => {
  const input = await c.req.json()
  const query = `INSERT INTO products(name, price) VALUES (?, ?)`
  const result = await c.env.DB.prepare(query).bind(input.name, input.price).run()
  return c.json({ success: true, id: result.lastInsertRowId })
})

export default app;
