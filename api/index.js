import { Hono } from 'hono';

const app = new Hono();

app.post('/api/wifi', async (c) => {
  const input = await c.req.json();
  const query = `
    INSERT INTO wifi (name, nohp, alamat, paket)
    VALUES (?, ?, ?, ?)`;
    
  const result = await c.env.DB.prepare(query)
    .bind(input.name, input.nohp, input.alamat, input.paket)
    .run();

  return c.json({ success: true, result });
});

export default app;
