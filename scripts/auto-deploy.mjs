#!/usr/bin/env node

import { runDailyTask } from './daily-task-runner.mjs';
import { pushToRemote } from './push-to-remote.mjs';

async function autoDeploy() {
  console.log('🚀 Starting automated deployment process...');
  
  try {
    // Run the daily task (fetch news and build site)
    await runDailyTask();
    
    // Push changes to remote repository
    await pushToRemote();
    
    console.log('✅ Automated deployment completed successfully!');
  } catch (error) {
    console.error('❌ Automated deployment failed:', error.message);
    process.exit(1);
  }
}

// If this script is run directly, execute the deployment
if (import.meta.url === `file://${process.argv[1]}`) {
  autoDeploy();
}

export { autoDeploy };