#!/bin/bash
# Quick script to trigger Jenkins build

JENKINS_URL="http://localhost:8080"
JOB_NAME="TaskManager-Pipeline"

# Get credentials from environment or prompt
if [ -z "$JENKINS_USER" ] || [ -z "$JENKINS_PASSWORD" ]; then
    read -p "Jenkins username: " JENKINS_USER
    read -sp "Jenkins password: " JENKINS_PASSWORD
    echo ""
fi

# Get CRUMB for CSRF protection
CRUMB=$(curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/crumbIssuer/api/json" | grep -o '"crumb":"[^"]*' | cut -d'"' -f4)

# Trigger build
echo "Triggering build for $JOB_NAME..."
curl -X POST -u "$JENKINS_USER:$JENKINS_PASSWORD" \
     -H "Jenkins-Crumb:$CRUMB" \
     "$JENKINS_URL/job/$JOB_NAME/build"

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Build triggered successfully!"
    echo "View console: $JENKINS_URL/job/$JOB_NAME/lastBuild/console"
else
    echo "❌ Failed to trigger build"
    exit 1
fi
