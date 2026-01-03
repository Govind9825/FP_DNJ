pipeline {
    agent any

    environment {
        // Docker Hub Info
        DOCKER_HUB_USER = 'govind9825'
        BACKEND_IMAGE   = "govind9825/inotebook-backend"
        FRONTEND_IMAGE  = "govind9825/inotebook-frontend"
        
        // Credential IDs (These must match the IDs you created in Jenkins)
        REGISTRY_CRED   = 'docker-hub-credentials'
        SSH_CRED_ID     = 'azure-vm-ssh'
        VM_IP_CRED_ID   = 'AZURE_VM_IP'
        VM_USER_CRED_ID = 'AZURE_VM_USER'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull code from GitHub
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                script {
                    // Build with both Build Number (for history) and Latest (for deployment)
                    sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} -t ${BACKEND_IMAGE}:latest ./Backend"
                    sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} -t ${FRONTEND_IMAGE}:latest ./frontend"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Securely login and push to Docker Hub
                    docker.withRegistry('', REGISTRY_CRED) {
                        sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                        sh "docker push ${BACKEND_IMAGE}:latest"
                        sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                        sh "docker push ${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Azure VM') {
            steps {
                script {
                    // Use 'withCredentials' to hide IP and User, 'sshagent' for the key
                    withCredentials([
                        string(credentialsId: VM_IP_CRED_ID, variable: 'VM_IP'),
                        string(credentialsId: VM_USER_CRED_ID, variable: 'VM_USER')
                    ]) {
                        sshagent([SSH_CRED_ID]) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} '
                                    cd ~/inotebook-deploy &&
                                    docker-compose pull &&
                                    docker-compose up -d
                                '
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Successfully deployed version ${BUILD_NUMBER} to Azure VM!"
        }
        failure {
            echo "Pipeline failed. Check the logs."
        }
        always {
            // Clean up workspace to prevent filling up disk space
            cleanWs()
        }
    }
}