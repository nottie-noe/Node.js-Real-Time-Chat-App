pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/nottie-noe/Node.js-Real-Time-Chat-App.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'No tests yet — skipping'
            }
        }

        stage('Deploy to EC2 via Ansible') {
            steps {
                sh '''
                    cd /mnt/d/project-2/ansible-chat-app
                    ansible-playbook -i inventory.ini playbook.yml --ssh-extra-args="-o StrictHostKeyChecking=no"
                '''
            }
        }
    }
}
