#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function runTodoCreation() {
  try {
    console.log('🔄 Starting hourly todo creation process...');
    
    // Change to the project directory
    process.chdir('/workspaces/AI-StartUP');
    
    // Create todos directory if it doesn't exist
    await fs.mkdir('todos', { recursive: true });
    console.log('📁 Ensured todos directory exists');
    
    // Execute the bash script
    const result = await execAsync('bash scripts/hourly_todo.sh');
    console.log('📝 Todo creation script executed');
    
    if (result.stdout) {
      console.log('✅ Output:', result.stdout.trim());
    }
    
    if (result.stderr) {
      console.warn('⚠️  Errors:', result.stderr.trim());
    }
    
    console.log('🎉 Hourly todo creation completed successfully');
  } catch (error) {
    console.error('💥 Error in todo creation process:', error.message);
    throw error;
  }
}

// Execute when run directly
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  runTodoCreation().catch(err => {
    console.error('Failed to run todo creation:', err);
    process.exit(1);
  });
}

export { runTodoCreation };