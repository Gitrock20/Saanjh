const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Initialize SQLite database
const db = new sqlite3.Database('./orders.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      customer_address TEXT,
      items TEXT,
      total_amount REAL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT
    )
  `);
}

// Routes

// Submit order from frontend
app.post('/api/orders', (req, res) => {
  const { customerName, customerEmail, customerPhone, customerAddress, items, totalAmount } = req.body;

  if (!customerName || !customerPhone || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const itemsJson = JSON.stringify(items);

  db.run(
    `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, items, total_amount, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    [customerName, customerEmail, customerPhone, customerAddress, itemsJson, totalAmount],
    function (err) {
      if (err) {
        console.error('Order insert error:', err);
        return res.status(500).json({ error: 'Failed to create order' });
      }
      res.json({
        success: true,
        message: 'Order placed successfully',
        orderId: this.lastID,
        timestamp: new Date().toISOString()
      });
    }
  );
});

// Get all orders (admin)
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.json(rows);
  });
});

// Get specific order
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch order' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(row);
  });
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  db.run(
    'UPDATE orders SET status = ?, notes = ? WHERE id = ?',
    [status, notes || '', id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update order' });
      }
      res.json({ success: true, message: 'Order updated successfully' });
    }
  );
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM orders WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete order' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Saanjh Vibe server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin.html`);
});
