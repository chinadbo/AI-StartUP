#!/bin/bash

# Build script for deploying to GitHub Pages

echo "Building AI-StartUP dashboard for GitHub Pages..."

# Install dependencies
npm install

# Build the application
npm run build

# Create the output directory with proper structure
mkdir -p out/_next

# Move built files to correct location
cp -r .next/static out/_next/

# Copy other necessary files
cp -r public/* out/ 2>/dev/null || true

# Create a fallback index.html for SPA routing
cat > out/404.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AI-StartUP Dashboard</title>
  <script type="text/javascript">
    // Single Page Application routing for GitHub Pages
    localStorage.setItem("redirect", window.location.href);
    window.location.href = "./";
  </script>
</head>
<body>
  Redirecting...
</body>
</html>
EOF

echo "Build completed successfully!"
echo "Files are ready in the 'out' directory"
echo "To deploy to GitHub Pages, push the 'out' directory contents to the 'gh-pages' branch"