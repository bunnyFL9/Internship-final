const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting all servers...\n');

// Start Telkom server (port 3000)
const teluServer = spawn('node', ['telkom-server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

console.log('📡 Telkom server starting on port 3000...');

// Wait a bit before starting Binus server
setTimeout(() => {
  // Start Binus server (port 3002)
  const binusServer = spawn('node', ['binus-server.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('📡 Binus server starting on port 3002...\n');
  
  console.log('✅ All servers are now running:');
  console.log('   🌐 Telkom University: http://localhost:3000');
  console.log('   🌐 Binus University: http://localhost:3002');
  console.log('\n📱 You can now access:');
  console.log('   • Main page: http://localhost:3000/index.html');
  console.log('   • University page: http://localhost:3000/university.html');
  console.log('   • Telkom page: http://localhost:3000/telu.html');
  console.log('   • Binus page: http://localhost:3000/binus.html');
  console.log('\n⏹️  Press Ctrl+C to stop all servers');
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down all servers...');
    teluServer.kill('SIGINT');
    binusServer.kill('SIGINT');
    process.exit(0);
  });
  
  // Handle server crashes
  teluServer.on('close', (code) => {
    console.log(`❌ Telkom server exited with code ${code}`);
    binusServer.kill('SIGINT');
    process.exit(code);
  });
  
  binusServer.on('close', (code) => {
    console.log(`❌ Binus server exited with code ${code}`);
    teluServer.kill('SIGINT');
    process.exit(code);
  });
}, 2000);

// Handle main process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
}); 