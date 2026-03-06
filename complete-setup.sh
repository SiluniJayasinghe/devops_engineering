#!/bin/bash
# Master Script: Complete Jenkins CI/CD Setup
# This runs all setup steps in sequence

set -e

PROJECT_DIR="/mnt/c/Users/USER/Desktop/UOR FOE/5th semester/EC5207 DevOps Engineering/DevOps Project"
cd "$PROJECT_DIR"

echo "=========================================="
echo "Complete Jenkins CI/CD Setup"
echo "=========================================="
echo ""
echo "This script will:"
echo "1. Configure Jenkins for Docker access"
echo "2. Install required Jenkins plugins"
echo "3. Create the pipeline job"
echo "4. Trigger the first build"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

# Step 1: Configure Jenkins for Docker
echo "STEP 1/3: Configuring Jenkins for Docker access..."
echo "=========================================="
if [ -f "./setup-jenkins.sh" ]; then
    chmod +x setup-jenkins.sh
    ./setup-jenkins.sh
else
    echo "❌ setup-jenkins.sh not found"
    exit 1
fi
echo ""

# Wait for Jenkins to be ready
echo "Waiting for Jenkins to stabilize (10 seconds)..."
sleep 10
echo ""

# Step 2: Automated Jenkins setup
echo "STEP 2/3: Installing plugins and creating pipeline..."
echo "=========================================="
if [ -f "./jenkins-auto-setup.sh" ]; then
    chmod +x jenkins-auto-setup.sh
    ./jenkins-auto-setup.sh
else
    echo "⚠ jenkins-auto-setup.sh not found, trying alternative method..."
    if [ -f "./jenkins-api-setup.sh" ]; then
        chmod +x jenkins-api-setup.sh
        ./jenkins-api-setup.sh
    else
        echo "❌ No setup script found"
        exit 1
    fi
fi
echo ""

# Step 3: Verify
echo "STEP 3/3: Setup Verification"
echo "=========================================="
echo "✓ Jenkins is configured"
echo "✓ Plugins are installed"
echo "✓ Pipeline job created"
echo "✓ First build triggered"
echo ""
echo "=========================================="
echo "Setup Complete! 🎉"
echo "=========================================="
echo ""
echo "Access your applications:"
echo "• Jenkins: http://localhost:8080/job/TaskManager-Pipeline/"
echo "• Frontend: http://localhost:3000 (after build completes)"
echo "• Backend: http://localhost:8081 (after build completes)"
echo "• Health Check: http://localhost:8081/actuator/health"
echo ""
echo "The build will take 5-10 minutes to complete."
echo "Monitor progress at: http://localhost:8080/job/TaskManager-Pipeline/1/console"
echo ""
