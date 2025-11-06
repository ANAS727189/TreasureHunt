import { initializeDatabase } from '../lib/database';

async function main() {  
  try {
    await initializeDatabase();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

main();
