pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/nottie-noe/Node.js-Real-Time-Chat-App.git'
                // Remove credentialsId if repo is public
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Skipping tests...'
                // Optional: Add real test script later
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sshagent(['chat-app-key']) {
                    sh '''
                        ansible-playbook -i inventory.ini playbook.yml --ssh-extra-args="-o StrictHostKeyChecking=no"
                    '''
                }
            }
        }
    }
}
