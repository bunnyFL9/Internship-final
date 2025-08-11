const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting both servers...\n');

// Start Telu server (port 3000)
const teluServer = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

console.log('📡 Telu server starting on port 3000...');

// Wait a bit before starting Binus server
setTimeout(() => {
  // Start Alumni server (port 3001)
  const alumniServer = spawn('node', ['alumni-server.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('📡 Alumni server starting on port 3001...\n');
  
  console.log('✅ Both servers are now running:');
  console.log('   🌐 Telu University: http://localhost:3000');
  console.log('   🌐 Alumni API: http://localhost:3001');
  console.log('\n📱 You can now access:');
  console.log('   • Main page: http://localhost:3000/index.html');
  console.log('   • Telu page: http://localhost:3000/telu.html');
  console.log('   • Binus page: http://localhost:3000/binus.html');
  console.log('\n⏹️  Press Ctrl+C to stop both servers');
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    teluServer.kill('SIGINT');
    alumniServer.kill('SIGINT');
    process.exit(0);
  });
  
  // Handle server crashes
  teluServer.on('close', (code) => {
    console.log(`❌ Telu server exited with code ${code}`);
    alumniServer.kill('SIGINT');
    process.exit(code);
  });
  
  alumniServer.on('close', (code) => {
    console.log(`❌ Alumni server exited with code ${code}`);
    teluServer.kill('SIGINT');
    process.exit(code);
  });
  
}, 2000);

// Handle main process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
}); 