pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-credentials', // or blank if it's a public repo
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
                sshagentchat-app-new-key.pem']) {
                    sh '''
                        cd /mnt/d/project-2/ansible-chat-app
                        ansible-playbook -i inventory.ini playbook.yml --ssh-extra-args="-o StrictHostKeyChecking=no"
                    '''
                }
            }
        }
    }
}
