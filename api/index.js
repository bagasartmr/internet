import { Hono } from 'hono';

const app = new Hono();

app.get('/api', (c) => {
  return c.text('hi');
});

app.get('/api/products', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM products").all();
  return c.json(results);
});

app.post('/api/products', async (c) => {
  const input = await c.req.json();
  const query = `INSERT INTO products(name, price) VALUES (?, ?)`;
  const newData = await c.env.DB.prepare(query).bind(input.name, input.price).run();
  return c.json(newData);
});

app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id');
  const { results } = await c.env.DB.prepare("SELECT * FROM products WHERE id = ?").bind(id).all();
  return c.json(results[0]);
});

app.put('/api/products/:id', async (c) => {
  const id = c.req.param('id');
  const input = await c.req.json();
  const query = `UPDATE products SET name = ?, price = ? WHERE id = ?`;
  const data = await c.env.DB.prepare(query).bind(input.name, input.price, id).run();
  return c.json(data);
});

app.delete('/api/products/:id', async (c) => {
  const id = c.req.param('id');
  const query = `DELETE FROM products WHERE id = ?`;
  const data = await c.env.DB.prepare(query).bind(id).run();
  return c.json(data);
});

// fallback ke frontend
app.get('*', async (c) => {
  try {
    return await c.env.ASSETS.fetch(c.req.raw);
  } catch (e) {
    return c.text(`ASSETS fallback error: ${e.message}`, 500);
  }
});

export default app;
