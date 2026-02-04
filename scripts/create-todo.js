#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function createTodo() {
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
    const todoContent = `# Todo Item
    
**Created:** ${now.toISOString()}

**Status:** Pending

**Priority:** Medium

**Description:**
Auto-generated todo item for ${now.toLocaleString()}.

**Tasks:**
- [ ] Review and update project status
- [ ] Check for new AI research papers
- [ ] Analyze market trends
- [ ] Update documentation

**Notes:**
This is an automatically generated todo item.
`;

    // Write the todo file
    await fs.writeFile(filepath, todoContent);
    console.log(`Created todo: ${filepath}`);

    // Git operations
    const relativePath = path.relative(process.cwd(), filepath);
    
    // Add file to git
    await execAsync(`git add "${relativePath}"`);
    console.log(`Added to git: ${relativePath}`);
    
    // Commit the file
    const commitMessage = `Add auto-generated todo for ${now.toLocaleString()}`;
    await execAsync(`git commit -m "${commitMessage}"`);
    console.log(`Committed: ${commitMessage}`);
    
    // Push to remote
    await execAsync('git push origin main');
    console.log('Pushed to remote repository');
    
    console.log(`Successfully created and pushed todo: ${filename}`);
  } catch (error) {
    console.error('Error creating todo:', error.message);
    process.exit(1);
  }
}

// Run the function if called directly
if (require.main === module) {
  createTodo().catch(console.error);
}

export { createTodo };