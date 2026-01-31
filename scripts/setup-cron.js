const cron = require('node-cron');
const { runDailyTask } = require('./daily-task-runner');

// Schedule the task to run every day at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running scheduled daily task...');
  runDailyTask();
}, {
  scheduled: false // We'll control this manually for now
});

console.log('Cron job scheduled to run daily at 8:00 AM');

module.exports = { scheduleTasks: cron.start };