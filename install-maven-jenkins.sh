#!/bin/bash
# Install Maven for Jenkins user
set -e

echo "=========================================="
echo "Installing Maven for Jenkins"
echo "=========================================="
echo ""

# Check if Maven is already installed for Jenkins
if sudo -u jenkins bash -c 'command -v mvn' &> /dev/null; then
    echo "✓ Maven already accessible to Jenkins"
    sudo -u jenkins mvn --version
    exit 0
fi

echo "Installing Maven..."

# Option 1: Install Maven via apt
echo "Installing Maven via apt..."
sudo apt update
sudo apt install -y maven

echo ""
echo "Verifying Maven installation..."
mvn --version

echo ""
echo "Testing Maven access for Jenkins user..."
sudo -u jenkins mvn --version

echo ""
echo "✓ Maven installed successfully!"
echo "Maven is now available to Jenkins."
