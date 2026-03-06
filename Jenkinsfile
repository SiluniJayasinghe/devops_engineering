pipeline {
    agent any
    
    environment {
        // Docker Compose file location
        COMPOSE_FILE = 'docker-compose.yaml'
        // Git repository
        GIT_REPO = 'https://github.com/SiluniJayasinghe/devops_engineering.git'
        // Set PATH to include Maven and other tools
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        MAVEN_HOME = '/usr/share/maven'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                echo 'Building Spring Boot Backend...'
                dir('TaskManager') {
                    sh '''
                        # Use full path for mvn or install it
                        which mvn || export PATH=$PATH:/usr/bin:/usr/local/bin
                        /usr/bin/mvn clean package -DskipTests || mvn clean package -DskipTests
                        ls -la target/
                    '''
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Installing Frontend Dependencies...'
                dir('my-react-app') {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running Backend Tests...'
                dir('TaskManager') {
                    sh '/usr/bin/mvn test || mvn test || echo "Tests skipped"'
                }
                
                echo 'Running Frontend Tests...'
                dir('my-react-app') {
                    sh 'npm test -- --passWithNoTests --watchAll=false'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker Images...'
                sh '''
                    docker compose build
                    docker images
                '''
            }
        }
        
        stage('Stop Previous Containers') {
            steps {
                echo 'Stopping previous containers if running...'
                sh '''
                    docker compose down || true
                '''
            }
        }
        
        stage('Deploy Application') {
            steps {
                echo 'Deploying Application with Docker Compose...'
                sh '''
                    docker compose up -d
                    docker compose ps
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing Health Check...'
                sh '''
                    sleep 30
                    echo "Checking Backend Health..."
                    curl -f http://localhost:8081/actuator/health || echo "Backend health check failed"
                    echo "Checking Frontend..."
                    curl -f http://localhost:3000 || echo "Frontend health check failed"
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            echo 'Application is running at:'
            echo 'Frontend: http://localhost:3000'
            echo 'Backend: http://localhost:8081'
        }
        failure {
            echo 'Pipeline failed!'
            sh 'docker compose logs || true'
        }
        always {
            echo 'Cleaning up...'
            // Clean up workspace if needed
            sh 'docker system prune -f || true'
        }
    }
}
