# Jenkins CI/CD Pipeline Setup Guide

This guide will help you set up a complete CI/CD pipeline for your TaskManager application using Jenkins.

## � FULLY AUTOMATED SETUP (Recommended)

Run this single command in WSL to complete everything automatically:

```bash
cd "/mnt/c/Users/USER/Desktop/UOR FOE/5th semester/EC5207 DevOps Engineering/DevOps Project"
chmod +x complete-setup.sh
./complete-setup.sh
```

This will:
- ✓ Configure Jenkins for Docker access
- ✓ Install all required plugins
- ✓ Create the pipeline job
- ✓ Trigger the first build

**You'll only need to provide your Jenkins username and password once.**

---

## �📋 Prerequisites (Already Verified ✓)

Your WSL environment has all required tools:
- ✓ Docker: 29.2.1
- ✓ Maven: 3.9.12
- ✓ Java: OpenJDK 21
- ✓ Node.js: v18.20.8
- ✓ NPM: 10.8.2
- ✓ Git: 2.43.0

---

## 🤖 Available Setup Methods

### Method 1: Fully Automated (EASIEST)
```bash
./complete-setup.sh
```
Runs everything automatically - just provide your Jenkins credentials.

### Method 2: CLI-based Automation
```bash
./jenkins-auto-setup.sh
```
Uses Jenkins CLI for plugin installation and job creation.

### Method 3: API-based Automation
```bash
./jenkins-api-setup.sh
```
Uses Jenkins REST API (alternative if CLI fails).

### Method 4: Manual Setup (Original)
Follow the manual steps below if you prefer to configure via Jenkins UI.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Run the Setup Script in WSL

```bash
cd "/mnt/c/Users/USER/Desktop/UOR FOE/5th semester/EC5207 DevOps Engineering/DevOps Project"
chmod +x setup-jenkins.sh
./setup-jenkins.sh
```

This script will:
- Add Jenkins user to docker group
- Configure Docker socket permissions
- Restart Jenkins
- Verify the setup

### Step 2: Install Jenkins Plugins

1. Open Jenkins: http://localhost:8080
2. Go to **Manage Jenkins** → **Plugins** → **Available plugins**
3. Search and install:
   - **Pipeline**
   - **Git plugin**
   - **Docker Pipeline**
   - **Docker Commons Plugin**
4. Check "Restart Jenkins when installation is complete"

### Step 3: Create the Pipeline Job

1. Click **New Item** on Jenkins dashboard
2. Enter name: `TaskManager-Pipeline`
3. Select **Pipeline** → Click **OK**
4. In the configuration page:

#### General Section:
- ✓ Check **GitHub project**
- URL: `https://github.com/SiluniJayasinghe/devops_engineering/`

#### Build Triggers:
- ✓ Check **Poll SCM**
- Schedule: `H/5 * * * *` (checks every 5 minutes)
  
#### Pipeline Section:
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/SiluniJayasinghe/devops_engineering.git`
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile`

5. Click **Save**
6. Click **Build Now**

## 📊 Pipeline Stages

Your pipeline includes these stages:

1. **Checkout** - Pulls latest code from GitHub
2. **Build Backend** - Compiles Spring Boot with Maven
3. **Build Frontend** - Builds React app with NPM
4. **Run Tests** - Executes backend and frontend tests
5. **Build Docker Images** - Creates Docker images
6. **Stop Previous Containers** - Stops old deployments
7. **Deploy Application** - Starts services with docker-compose
8. **Health Check** - Verifies application is running

## 🔍 Monitoring Your Pipeline

After running the pipeline:

- **Console Output**: View real-time build logs
- **Stage View**: See which stage succeeded/failed
- **Application Access**:
  - Frontend: http://localhost:3000
  - Backend: http://localhost:8081
  - Health Check: http://localhost:8081/actuator/health

## 🛠️ What Was Updated

### 1. Added Spring Boot Actuator
- File: `TaskManager/pom.xml`
- Purpose: Enables health check endpoints

### 2. Configured Health Endpoints
- File: `TaskManager/src/main/resources/application.properties`
- Endpoints: `/actuator/health`, `/actuator/info`

### 3. Created Jenkinsfile
- File: `Jenkinsfile`
- Purpose: Defines the entire CI/CD pipeline

### 4. Created Setup Script
- File: `setup-jenkins.sh`
- Purpose: Automates Jenkins configuration

## 🐛 Troubleshooting

### Jenkins can't access Docker
```bash
# Run in WSL
sudo usermod -aG docker jenkins
sudo chmod 666 /var/run/docker.sock
sudo systemctl restart jenkins
```

### Build fails at Maven stage
```bash
# Verify Maven setup
wsl mvn --version
```

### Pipeline can't checkout code
- Verify your GitHub repository is accessible
- Check if you need to add credentials in Jenkins

### Port already in use
```bash
# Stop existing containers
docker-compose down
# Check what's using the port
sudo lsof -i :8080
```

## 📝 Webhook Setup (Optional - For Auto-Trigger)

To trigger builds automatically on GitHub push:

1. In Jenkins pipeline config:
   - Build Triggers → ✓ **GitHub hook trigger for GITScm polling**

2. In GitHub repository:
   - Settings → Webhooks → Add webhook
   - Payload URL: `http://YOUR_PUBLIC_IP:8080/github-webhook/`
   - Content type: `application/json`
   - Select: "Just the push event"

## 🎯 Testing the Pipeline

1. Click **Build Now** in Jenkins
2. Watch the **Stage View** progress
3. Check **Console Output** for detailed logs
4. Access your applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081
   - Health: http://localhost:8081/actuator/health

## ✅ Success Indicators

You'll know the pipeline works when you see:
- ✓ All 8 stages show green checkmarks
- ✓ Console output shows "Pipeline completed successfully!"
- ✓ Applications accessible at their URLs
- ✓ Health check returns `{"status":"UP"}`

## � Triggering Future Builds

After initial setup, trigger new builds easily:

```bash
# Quick trigger
./trigger-build.sh

# Or via curl directly
curl -X POST -u username:password http://localhost:8080/job/TaskManager-Pipeline/build
```

Builds also trigger automatically every 5 minutes if changes are detected in the git repository.

## 📦 Created Files Summary

- `Jenkinsfile` - Pipeline definition
- `setup-jenkins.sh` - Docker/Jenkins configuration
- `complete-setup.sh` - Master automated setup script
- `jenkins-auto-setup.sh` - CLI-based automation
- `jenkins-api-setup.sh` - API-based automation  
- `trigger-build.sh` - Quick build trigger
- `JENKINS_SETUP.md` - This guide

## �📫 Need Help?

Common issues and solutions are in the Troubleshooting section above.
