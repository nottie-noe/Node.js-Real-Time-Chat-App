pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
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

        stage('Deploy with Ansible') {
            steps {
                sshagent(['chat-app-key']) {
                    sh '''
                        cd /mnt/d/project-2/ansible-chat-app
                        ansible-playbook -i inventory.ini playbook.yml --ssh-extra-args="-o StrictHostKeyChecking=no"
                    '''
                }
            }
        }
    }
}
