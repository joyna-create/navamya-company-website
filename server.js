const express = require('express');
const path = require('path');
const open = require('open');

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = 'localhost';

// Serve static files from current directory
app.use(express.static(__dirname));

// Handle SPA routing - serve index.html for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}`;
  
  console.log('🚀 Navamya Website Server Starting...');
  console.log(`📂 Serving files from: ${__dirname}`);
  console.log(`🌐 Server running at: ${url}`);
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
  console.log('\n🛑 Server stopped by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated');
  process.exit(0);
});
