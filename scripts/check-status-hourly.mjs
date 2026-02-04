#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function checkGitStatus() {
  console.log(`\n[${new Date().toISOString()}] 检查 GitHub workspace 状态...`);

  try {
    // Change to the project directory
    const projectDir = '/workspaces/AI-StartUP';
    process.chdir(projectDir);

    // Get git status
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    const isClean = status.trim() === '';
    
    console.log(`仓库状态: ${isClean ? '干净' : '有更改'}`);
    
    if (!isClean) {
      console.log('未提交的更改:');
      console.log(status);
    }
    
    // Check current branch
    const branch = execSync('git branch --show-current', { encoding: 'utf-8' });
    console.log(`当前分支: ${branch.trim()}`);
    
    // Check commit history
    const lastCommit = execSync('git log --oneline -1', { encoding: 'utf-8' });
    console.log(`最新提交: ${lastCommit.trim()}`);
    
    // Check remote status
    try {
      execSync('git fetch', { stdio: 'pipe' });
      const localRev = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
      const remoteRev = execSync('git rev-parse @{u}', { encoding: 'utf-8' }).trim();
      
      if (localRev === remoteRev) {
        console.log('本地与远程仓库同步');
      } else {
        console.log('本地与远程仓库不同步');
      }
    } catch (error) {
      console.log('无法获取远程状态');
    }
    
  } catch (error) {
    console.error('检查过程中出现错误:', error.message);
  }
}

// Run immediately when script starts
checkGitStatus();

// Set interval to run every hour (3600000 milliseconds)
setInterval(checkGitStatus, 3600000);