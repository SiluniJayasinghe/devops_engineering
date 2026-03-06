# TaskManager CI/CD Pipeline - Quick Start

## 🎯 One-Command Setup

Open WSL terminal and run:

```bash
cd "/mnt/c/Users/USER/Desktop/UOR FOE/5th semester/EC5207 DevOps Engineering/DevOps Project"
chmod +x complete-setup.sh && ./complete-setup.sh
```

**That's it!** The script will:
1. Configure Jenkins for Docker
2. Install required plugins
3. Create your pipeline job
4. Start the first build

You'll only need to enter your Jenkins username and password.

## 📋 What You Need

Before running the script, make sure:
- ✅ Jenkins is running at http://localhost:8080
- ✅ You know your Jenkins admin username (usually `admin`)
- ✅ You know your Jenkins admin password

### Finding Your Jenkins Password

If you don't know your Jenkins password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## 🔍 Monitor Your Build

After the script completes:
- **Pipeline**: http://localhost:8080/job/TaskManager-Pipeline/
- **Console Output**: http://localhost:8080/job/TaskManager-Pipeline/1/console

The build takes 5-10 minutes. Once complete:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8081
- **Health Check**: http://localhost:8081/actuator/health

## 🔄 Trigger New Builds

```bash
./trigger-build.sh
```

## 📚 Full Documentation

See [JENKINS_SETUP.md](JENKINS_SETUP.md) for:
- Manual setup instructions
- Alternative setup methods
- Troubleshooting guide
- Detailed explanations

## 🚨 If Something Goes Wrong

1. Check Jenkins is running: `sudo systemctl status jenkins`
2. View Jenkins logs: `sudo journalctl -u jenkins -n 50`
3. Check Docker: `docker ps`
4. See troubleshooting in [JENKINS_SETUP.md](JENKINS_SETUP.md)

## 📦 What's Included

This project includes:
- **React Frontend** (my-react-app/)
- **Spring Boot Backend** (TaskManager/)
- **MySQL Database** (via Docker)
- **Complete CI/CD Pipeline** (Jenkinsfile)
- **Automated Setup Scripts** (*.sh files)

## 🎓 Project Structure

```
.
├── Jenkinsfile                  # CI/CD Pipeline definition
├── docker-compose.yaml          # Multi-container orchestration
├── complete-setup.sh           # 🎯 RUN THIS FIRST
├── setup-jenkins.sh            # Jenkins Docker configuration
├── jenkins-auto-setup.sh       # CLI-based automation
├── jenkins-api-setup.sh        # API-based automation
├── trigger-build.sh            # Quick build trigger
├── JENKINS_SETUP.md            # Detailed setup guide
├── my-react-app/               # Frontend application
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── TaskManager/                # Backend application
    ├── Dockerfile
    ├── pom.xml
    └── src/
```

---

**Ready to start?** Run `./complete-setup.sh` in WSL! 🚀
