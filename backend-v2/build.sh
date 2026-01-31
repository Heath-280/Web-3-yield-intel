#!/bin/bash
# Install Python dependencies
pip install -r ml/requirements.txt || echo "Python ML dependencies failed to install, using fallback"

# Build the Node.js app
npm install
npm run build