const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const open = require('open');

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = 'localhost';

// Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'contact_data.db');
const db = new sqlite3.Database(dbPath);

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Serve static files
app.use(express.static(__dirname));

// Handle contact form submission
app.post('/submit-contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  
  // Validate required fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill out all required fields.' 
    });
  }
  
  // Insert into database
  const stmt = db.prepare(`INSERT INTO contact_submissions 
    (first_name, last_name, email, message) VALUES (?, ?, ?, ?)`);
  
  stmt.run([firstName, lastName, email, message], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error occurred.' 
      });
    }
    
    console.log(`✅ New contact submission saved with ID: ${this.lastID}`);
    res.json({ 
      success: true, 
      message: 'Thank you! Your message has been saved successfully.',
      id: this.lastID
    });
  });
  
  stmt.finalize();
});

// API endpoint to view all submissions (for admin)
app.get('/api/contacts', (req, res) => {
  db.all(`SELECT * FROM contact_submissions ORDER BY submission_date DESC`, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Admin page to view submissions
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact Submissions - Admin</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="container mt-4">
        <h1>Contact Form Submissions</h1>
        <div id="submissions"></div>
      </div>
      
      <script>
        fetch('/api/contacts')
          .then(response => response.json())
          .then(data => {
            const container = document.getElementById('submissions');
            if (data.length === 0) {
              container.innerHTML = '<p>No submissions yet.</p>';
              return;
            }
            
            let html = '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead><tbody>';
            data.forEach(row => {
              html += \`<tr>
                <td>\${row.id}</td>
                <td>\${row.first_name} \${row.last_name}</td>
                <td><a href="mailto:\${row.email}">\${row.email}</a></td>
                <td>\${row.message || 'No message'}</td>
                <td>\${new Date(row.submission_date).toLocaleString()}</td>
              </tr>\`;
            });
            html += '</tbody></table></div>';
            container.innerHTML = html;
          })
          .catch(error => {
            console.error('Error:', error);
            document.getElementById('submissions').innerHTML = '<p class="text-danger">Error loading submissions.</p>';
          });
      </script>
    </body>
    </html>
  `);
});

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}`;
  
  console.log('🚀 Navamya Website Server with Database Starting...');
  console.log(`📂 Serving files from: ${__dirname}`);
  console.log(`💾 Database: ${dbPath}`);
  console.log(`🌐 Server running at: ${url}`);
  console.log(`👤 Admin panel: ${url}/admin`);
  console.log(`📱 Open your browser and go to: ${url}`);
  console.log('🛑 Press Ctrl+C to stop the server');
  console.log('-'.repeat(50));
  
  // Try to open browser automatically
  open(url).then(() => {
    console.log('✅ Browser opened automatically');
  }).catch(() => {
    console.log('❌ Could not open browser automatically');
    console.log(`   Please open ${url} manually in your browser`);
  });
  
  console.log('-'.repeat(50));
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Server stopping...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('💾 Database connection closed');
    }
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated');
  db.close();
  process.exit(0);
});
