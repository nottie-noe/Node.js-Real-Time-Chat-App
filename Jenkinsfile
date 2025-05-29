pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-credentials', // blank if public repo
                    url: 'https://github.com/nottie-noe/Node.js-Real-Time-Chat-App.git'
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
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sshagent(['chat-app-new-key.pem']) {
                    sh '''
                        cd ansible-chat-app
                        ansible-playbook -i inventory.ini playbook.yml --ssh-extra-args="-o StrictHostKeyChecking=no"
                    '''
                }
            }
        }
    }
}
