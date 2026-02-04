#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function createHourlyTodo() {
  try {
    // Create todos directory if it doesn't exist
    const todosDir = path.join(process.cwd(), 'todos');
    await fs.mkdir(todosDir, { recursive: true });
    
    // Generate filename with current timestamp
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const filename = `todo-${timestamp}.md`;
    const filepath = path.join(todosDir, filename);
    
    // Create todo content
    const todoContent = `# Hourly Todo - ${now.toLocaleString()}

**Created:** ${now.toISOString()}

**Status:** Pending

**Priority:** Medium

## Tasks to Complete

- [ ] Review project progress
- [ ] Check for new AI developments
- [ ] Update documentation if needed
- [ ] Verify system health

## Goals for This Hour

1. Maintain system uptime
2. Process any queued items
3. Monitor for new inputs

## Notes

Auto-generated todo item for the hour of ${now.getHours()}:00 on ${now.toDateString()}.

Current system status: Operational
Next scheduled maintenance: None
`;

    // Write the todo file
    await fs.writeFile(filepath, todoContent);
    console.log(`✓ Created todo: ${filepath}`);

    // Check if there are changes to commit
    const { stdout: gitStatus } = await execAsync('git status --porcelain');
    
    if (gitStatus.trim()) {
      // Add file to git
      const relativePath = path.relative(process.cwd(), filepath);
      await execAsync(`git add "${relativePath}"`);
      console.log(`✓ Added to git: ${relativePath}`);
      
      // Configure git if needed
      try {
        await execAsync('git config user.name "OpenClaw Automation"');
        await execAsync('git config user.email "openclaw@example.com"');
      } catch (e) {
        // Config might already exist, that's OK
      }
      
      // Commit the file
      const commitMessage = `Auto: Add hourly todo for ${now.toLocaleString()}`;
      await execAsync(`git commit -m "${commitMessage}"`);
      console.log(`✓ Committed: ${commitMessage}`);
      
      // Push to remote
      try {
        await execAsync('git push origin main');
        console.log('✓ Pushed to remote repository');
      } catch (pushErr) {
        console.error('⚠ Push failed:', pushErr.message);
        console.log('Local commit created successfully, but push to remote failed.');
      }
    } else {
      console.log('→ No changes to commit');
    }
    
    console.log(`\n✓ Successfully processed hourly todo: ${filename}`);
    return filepath;
  } catch (error) {
    console.error('✗ Error creating hourly todo:', error.message);
    throw error;
  }
}

// Run the function if called directly
if (require.main === module) {
  console.log('🚀 Starting hourly todo creation process...');
  createHourlyTodo()
    .then(() => {
      console.log('✅ Hourly todo creation completed successfully');
    })
    .catch(error => {
      console.error('💥 Failed to create hourly todo:', error.message);
      process.exit(1);
    });
}

export { createHourlyTodo };