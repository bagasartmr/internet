import { Hono } from 'hono';

const app = new Hono();

app.get('/api', (c) => {
  return c.text('hai nama saya bagas :)');
})

app.get('/api/wifi', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM wifi').all();
  return c.json(result.results);
});

app.post('/api/wifi', async (c) => {
  const input = await c.req.json();
  const query = `
    INSERT INTO wifi (name, nohp, alamat, paket)
    VALUES (?, ?, ?, ?)`;
    
  const result = await c.env.DB.prepare(query)
    .bind(input.name, input.nohp, input.alamat, input.paket)
    .run();
  
  return c.json({ success: true, result });
})

app.put('/api/wifi/:id', async (c) => {
  const id = c.req.param('id')
  const input = await c.req.json()

  const query = `
    UPDATE wifi SET name = ?, nohp = ?, alamat = ?, paket = ? WHERE id = ?`;
    
  const result = await c.env.DB.prepare(query)
    .bind(input.name, input.nohp, input.alamat, input.paket, id)
    .run()

  return c.json({ success: true, result })
})


app.delete('/api/wifi/:id', async (c) => {
  const id = c.req.param('id');

  const query = `DELETE FROM wifi WHERE id = ?`;
  const result = await c.env.DB.prepare(query).bind(id).run();  

  return c.json({ success: true, result });
});

export default app;
