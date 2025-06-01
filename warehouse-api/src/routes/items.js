const express = require('express');
const pool = require('../db');
const router = express.Router();

// 初始化表（可选）
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      quantity INT NOT NULL DEFAULT 0,
      location VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
})();

// CRUD 接口
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM items');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: 'Item not found' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { name, description, quantity, location } = req.body;
  const [result] = await pool.query(
    'INSERT INTO items (name, description, quantity, location) VALUES (?, ?, ?, ?)',
    [name, description, quantity, location]
  );
  const [newItem] = await pool.query('SELECT * FROM items WHERE id = ?', [result.insertId]);
  res.status(201).json(newItem[0]);
});

router.put('/:id', async (req, res) => {
  const { name, description, quantity, location } = req.body;
  await pool.query(
    'UPDATE items SET name=?, description=?, quantity=?, location=? WHERE id=?',
    [name, description, quantity, location, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM items WHERE id = ?', [req.params.id]);
  res.status(204).send();
});

module.exports = router;
