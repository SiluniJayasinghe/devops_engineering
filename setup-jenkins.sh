#!/bin/bash
# Jenkins CI/CD Pipeline Setup Script
# Run this script in WSL to configure Jenkins for your pipeline

echo "=========================================="
echo "Jenkins CI/CD Pipeline Setup"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo "❌ Please run this script without sudo"
    echo "The script will prompt for sudo when needed"
    exit 1
fi

echo "✓ Checking if Jenkins is installed..."
if ! systemctl list-units --type=service | grep -q jenkins; then
    echo "❌ Jenkins service not found. Please install Jenkins first."
    exit 1
fi
echo "✓ Jenkins service found"
echo ""

echo "Step 1: Adding Jenkins user to docker group..."
if sudo grep -q docker /etc/group; then
    sudo usermod -aG docker jenkins
    echo "✓ Jenkins user added to docker group"
else
    echo "⚠ Docker group not found. Creating docker group..."
    sudo groupadd docker
    sudo usermod -aG docker jenkins
    echo "✓ Docker group created and Jenkins user added"
fi
echo ""

echo "Step 2: Setting proper permissions for Docker socket..."
if [ -S /var/run/docker.sock ]; then
    sudo chmod 666 /var/run/docker.sock
    echo "✓ Docker socket permissions set"
else
    echo "⚠ Docker socket not found at /var/run/docker.sock"
fi
echo ""

echo "Step 3: Verifying Docker access..."
if sudo -u jenkins docker ps &>/dev/null; then
    echo "✓ Jenkins can access Docker"
else
    echo "⚠ Jenkins cannot access Docker yet. Restart may be needed."
fi
echo ""

echo "Step 4: Restarting Jenkins service..."
sudo systemctl restart jenkins
echo "⏳ Waiting for Jenkins to start (30 seconds)..."
sleep 30
echo "✓ Jenkins restarted"
echo ""

echo "Step 5: Checking Jenkins status..."
if sudo systemctl is-active --quiet jenkins; then
    echo "✓ Jenkins is running"
else
    echo "❌ Jenkins is not running. Check logs with: sudo journalctl -u jenkins -n 50"
    exit 1
fi
echo ""

echo "Step 6: Displaying Jenkins configuration..."
echo "Jenkins Home: $(sudo -u jenkins sh -c 'echo $JENKINS_HOME')"
echo "Jenkins URL: http://localhost:8080"
echo ""

echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Open Jenkins in your browser: http://localhost:8080"
echo "2. Go to Manage Jenkins → Manage Plugins → Available"
echo "3. Install these plugins:"
echo "   - Pipeline"
echo "   - Git plugin"
echo "   - Docker Pipeline"
echo "   - Docker Commons Plugin"
echo "4. Create a new Pipeline job"
echo "5. Configure it to use SCM (Git) with your repository"
echo "6. Set Script Path to: Jenkinsfile"
echo ""
echo "Repository URL: https://github.com/SiluniJayasinghe/devops_engineering.git"
echo ""
