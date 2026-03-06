#!/bin/bash
# Non-Interactive Jenkins Setup with Provided Credentials
set -e

JENKINS_URL="http://localhost:8080"
JENKINS_USER="admin"
JENKINS_PASSWORD="sinkins123"
JOB_NAME="TaskManager-Pipeline"

echo "=========================================="
echo "Automated Jenkins Pipeline Setup"
echo "=========================================="
echo ""

# Wait for Jenkins to be ready
echo "Waiting for Jenkins to be ready..."
for i in {1..30}; do
    if curl -s "$JENKINS_URL" > /dev/null 2>&1; then
        echo "✓ Jenkins is accessible"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 3
done
echo ""

# Download Jenkins CLI
echo "Step 1: Downloading Jenkins CLI..."
JENKINS_CLI="/tmp/jenkins-cli.jar"
curl -s -o "$JENKINS_CLI" "$JENKINS_URL/jnlpJars/jenkins-cli.jar"
echo "✓ Jenkins CLI downloaded"
echo ""

# Install plugins
echo "Step 2: Installing required plugins..."
PLUGINS=("workflow-aggregator" "git" "docker-workflow" "docker-commons")

for plugin in "${PLUGINS[@]}"; do
    echo "Installing $plugin..."
    java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" install-plugin "$plugin" -restart || {
        echo "⚠ Plugin installation queued: $plugin"
    }
done
echo "✓ Plugins installation initiated"
echo ""

# Safe restart and wait
echo "Step 3: Restarting Jenkins..."
java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" safe-restart || true
echo "⏳ Waiting for Jenkins to restart (60 seconds)..."
sleep 60

# Wait for Jenkins to be ready again
echo "Waiting for Jenkins to be fully operational..."
for i in {1..20}; do
    if curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/api/json" > /dev/null 2>&1; then
        echo "✓ Jenkins is ready"
        break
    fi
    echo "Waiting... ($i/20)"
    sleep 5
done
echo ""

# Create pipeline job
echo "Step 4: Creating pipeline job..."
cat > /tmp/pipeline-config.xml << 'EOF'
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job">
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
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition">
    <scm class="hudson.plugins.git.GitSCM">
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

# Create the job
java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" create-job "$JOB_NAME" < /tmp/pipeline-config.xml 2>/dev/null || {
    echo "⚠ Job exists, updating..."
    java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" update-job "$JOB_NAME" < /tmp/pipeline-config.xml
}
echo "✓ Pipeline job created: $JOB_NAME"
echo ""

# Trigger build
echo "Step 5: Triggering first build..."
java -jar "$JENKINS_CLI" -s "$JENKINS_URL" -auth "$JENKINS_USER:$JENKINS_PASSWORD" build "$JOB_NAME" -s -v
echo "✓ Build triggered"
echo ""

echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "View your pipeline:"
echo "  $JENKINS_URL/job/$JOB_NAME/"
echo ""
echo "Monitor the build:"
echo "  $JENKINS_URL/job/$JOB_NAME/1/console"
echo ""
echo "Once build completes (5-10 minutes):"
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:8081"
echo "  Health: http://localhost:8081/actuator/health"
echo ""
