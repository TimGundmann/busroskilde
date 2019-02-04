pipeline {
    agent any

    tools {
        nodejs 'node 11'
    }
    stages {
        stage('Prepare') {
            steps{
               git 'https://github.com/TimGundmann/busroskilde.git'
               sh 'rm -rf node_module' 
               sh 'npm install'
               sh 'npm rebuild node-sass'
            }                
        }

        stage('Build') {
            steps{   
                sh 'ng build --prod --base-href /bus'
            }
        }
        stage('Deploy') {
            steps{
                sh 'docker-compose stop'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }

  post {
      failure {
            step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: emailextrecipients([[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']])])      
        }
  }    
}
