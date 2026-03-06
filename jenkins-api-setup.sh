#!/bin/bash
# Alternative: Jenkins Pipeline Setup using REST API
# Use this if CLI method doesn't work

set -e

JENKINS_URL="http://localhost:8080"

echo "=========================================="
echo "Jenkins Pipeline Setup (REST API Method)"
echo "=========================================="
echo ""

# Get credentials
read -p "Enter Jenkins username: " JENKINS_USER
read -sp "Enter Jenkins password/token: " JENKINS_PASSWORD
echo ""
echo ""

# Test connection
echo "Testing connection..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/api/json")
if [ "$HTTP_CODE" != "200" ]; then
    echo "❌ Cannot connect to Jenkins (HTTP $HTTP_CODE)"
    exit 1
fi
echo "✓ Connected to Jenkins"
echo ""

# Install plugins using REST API
echo "Installing plugins..."
CRUMB=$(curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/crumbIssuer/api/json" | grep -o '"crumb":"[^"]*' | cut -d'"' -f4)

PLUGINS=("workflow-aggregator" "git" "docker-workflow" "docker-commons")
for plugin in "${PLUGINS[@]}"; do
    echo "Installing $plugin..."
    curl -X POST -u "$JENKINS_USER:$JENKINS_PASSWORD" \
         -H "Jenkins-Crumb:$CRUMB" \
         "$JENKINS_URL/pluginManager/installNecessaryPlugins" \
         -d "<jenkins><install plugin='${plugin}@latest' /></jenkins>" \
         -H "Content-Type: text/xml" || true
done
echo ""

# Create job XML
cat > /tmp/job-config.xml << 'EOF'
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job">
  <description>CI/CD Pipeline for TaskManager Application</description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <org.jenkinsci.plugins.workflow.job.properties.PipelineTriggersJobProperty>
      <triggers>
        <hudson.triggers.SCMTrigger>
          <spec>H/5 * * * *</spec>
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
    </scm>
    <scriptPath>Jenkinsfile</scriptPath>
    <lightweight>true</lightweight>
  </definition>
</flow-definition>
EOF

# Create the job
JOB_NAME="TaskManager-Pipeline"
echo "Creating pipeline job: $JOB_NAME..."
CRUMB=$(curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/crumbIssuer/api/json" | grep -o '"crumb":"[^"]*' | cut -d'"' -f4)

curl -X POST -u "$JENKINS_USER:$JENKINS_PASSWORD" \
     -H "Jenkins-Crumb:$CRUMB" \
     -H "Content-Type: application/xml" \
     "$JENKINS_URL/createItem?name=$JOB_NAME" \
     --data-binary @/tmp/job-config.xml

echo "✓ Job created"
echo ""

# Trigger build
echo "Triggering build..."
CRUMB=$(curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/crumbIssuer/api/json" | grep -o '"crumb":"[^"]*' | cut -d'"' -f4)

curl -X POST -u "$JENKINS_USER:$JENKINS_PASSWORD" \
     -H "Jenkins-Crumb:$CRUMB" \
     "$JENKINS_URL/job/$JOB_NAME/build"

echo "✓ Build triggered"
echo ""
echo "View your pipeline: $JENKINS_URL/job/$JOB_NAME/"
echo ""
