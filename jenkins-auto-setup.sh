#!/bin/bash
# Automated Jenkins Pipeline Setup using Jenkins CLI
# This script will install plugins, create pipeline job, and trigger build

set -e  # Exit on error

JENKINS_URL="http://localhost:8080"
JENKINS_HOME="/var/lib/jenkins"

echo "=========================================="
echo "Automated Jenkins Pipeline Setup"
echo "=========================================="
echo ""

# Check if Jenkins is running
echo "Step 1: Checking Jenkins status..."
if ! curl -s -o /dev/null -w "%{http_code}" "$JENKINS_URL" | grep -q "200\|403"; then
    echo "❌ Jenkins is not accessible at $JENKINS_URL"
    echo "Please ensure Jenkins is running: sudo systemctl start jenkins"
    exit 1
fi
echo "✓ Jenkins is accessible"
echo ""

# Get Jenkins credentials
echo "Step 2: Jenkins Authentication Setup"
echo "To automate the setup, we need your Jenkins admin credentials."
echo ""
read -p "Enter Jenkins username (usually 'admin'): " JENKINS_USER
read -sp "Enter Jenkins password: " JENKINS_PASSWORD
echo ""
echo ""

# Test authentication
echo "Step 3: Testing authentication..."
if ! curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/api/json" > /dev/null; then
    echo "❌ Authentication failed. Please check your credentials."
    exit 1
fi
echo "✓ Authentication successful"
echo ""

# Download Jenkins CLI
echo "Step 4: Downloading Jenkins CLI..."
JENKINS_CLI="/tmp/jenkins-cli.jar"
if [ -f "$JENKINS_CLI" ]; then
    echo "✓ Jenkins CLI already exists"
else
    curl -s -o "$JENKINS_CLI" "$JENKINS_URL/jnlpJars/jenkins-cli.jar"
    echo "✓ Jenkins CLI downloaded"
fi
echo ""

# Install required plugins
echo "Step 5: Installing required plugins..."
PLUGINS=("workflow-aggregator" "git" "docker-workflow" "docker-commons")

for plugin in "${PLUGINS[@]}"; do
    echo "Installing $plugin..."
    java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" install-plugin "$plugin" || true
done
echo "✓ Plugins installation initiated"
echo ""

# Wait for plugin installation and restart
echo "Step 6: Restarting Jenkins to activate plugins..."
java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" safe-restart
echo "⏳ Waiting for Jenkins to restart (60 seconds)..."
sleep 60

# Wait for Jenkins to be ready
echo "Waiting for Jenkins to be fully ready..."
for i in {1..30}; do
    if curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/api/json" > /dev/null 2>&1; then
        echo "✓ Jenkins is ready"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 5
done
echo ""

# Create pipeline job configuration
echo "Step 7: Creating pipeline job..."
PROJECT_DIR="/mnt/c/Users/USER/Desktop/UOR FOE/5th semester/EC5207 DevOps Engineering/DevOps Project"
cd "$PROJECT_DIR"

cat > /tmp/pipeline-config.xml << 'EOF'
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@2.40">
  <description>CI/CD Pipeline for TaskManager Application</description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
      <triggers>
        <hudson.triggers.SCMTrigger>
          <spec>H/5 * * * *</spec>
          <ignorePostCommitHooks>false</ignorePostCommitHooks>
        </hudson.triggers.SCMTrigger>
      </triggers>
    </org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition" plugin="workflow-cps@2.90">
    <scm class="hudson.plugins.git.GitSCM" plugin="git@4.10.0">
      <configVersion>2</configVersion>
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>https://github.com/SiluniJayasinghe/devops_engineering.git</url>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/main</name>
        </hudson.plugins.git.BranchSpec>
      </branches>
      <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
      <submoduleCfg class="empty-list"/>
      <extensions/>
    </scm>
    <scriptPath>Jenkinsfile</scriptPath>
    <lightweight>true</lightweight>
  </definition>
  <triggers/>
  <disabled>false</disabled>
</flow-definition>
EOF

# Create the job using CLI
JOB_NAME="TaskManager-Pipeline"
java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" create-job "$JOB_NAME" < /tmp/pipeline-config.xml || {
    echo "⚠ Job may already exist. Updating instead..."
    java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" update-job "$JOB_NAME" < /tmp/pipeline-config.xml
}
echo "✓ Pipeline job created/updated: $JOB_NAME"
echo ""

# Trigger the build
echo "Step 8: Triggering first build..."
java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" build "$JOB_NAME"
echo "✓ Build triggered"
echo ""

echo "=========================================="
echo "✓ Automated Setup Complete!"
echo "=========================================="
echo ""
echo "Pipeline job '$JOB_NAME' has been created and the first build is running."
echo ""
echo "View your pipeline at:"
echo "$JENKINS_URL/job/$JOB_NAME/"
echo ""
echo "Monitor the build:"
echo "$JENKINS_URL/job/$JOB_NAME/1/console"
echo ""
