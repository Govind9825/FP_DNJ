pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'your_dockerhub_username'
        BACKEND_IMAGE   = "your_dockerhub_username/inotebook-backend"
        FRONTEND_IMAGE  = "your_dockerhub_username/inotebook-frontend"
        REGISTRY_CRED   = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                script {
                    // Build backend and frontend images
                    sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
                    sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CRED) {
                        sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                        sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Here you would SSH into your server and run docker-compose up
                    echo "Deploying version ${BUILD_NUMBER}..."
                    // Example: sh "docker-compose up -d"
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Deletes the workspace to save disk space
        }
    }
}