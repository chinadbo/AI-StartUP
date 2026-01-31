#!/bin/bash

# Script to set up daily AI news fetching via cron

echo "Setting up daily AI news fetcher..."

# Create the crontab entry
# This will run the news fetcher daily at 8:00 AM
CRON_ENTRY="0 8 * * * cd /workspaces/AI-StartUP && /usr/bin/node ./scripts/daily_news_fetcher.js >> ./logs/daily_news.log 2>&1"

# Check if we already have this entry
(crontab -l 2>/dev/null | grep -F "$CRON_ENTRY") || (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -

echo "Cron job added for daily AI news fetching"
echo "The script will run daily at 8:00 AM to create a new news file"
echo ""
echo "To view your current cron jobs, run: crontab -l"
echo "To remove the job later, run: crontab -r"