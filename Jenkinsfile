pipeline {
    agent any

    environment {
        STRING = "blue"
    }

    tools {
        nodejs "node 11"
    }
    stages {
        stage("Prepare") {
            steps{
               git "https://github.com/TimGundmann/busroskilde.git"
               sh "npm install"
               sh "npm version 1.0.${currentBuild.number}"
               script {
                    currentBuild.displayName = "Version: 1.0.${currentBuild.number}"
               }
            }                
        }
        
        stage("Test") {
            steps{
                wrap([$class: "Xvfb", displayName: 1]) {
                    sh "ps -aux | grep Xvfb"
                    sh "export DISPLAY=:1"
                    sh "ng test --watch false"
                }
            }                
        }

        stage("Build") {
            steps{   
                sh "ng build --prod"
            }
        }
        stage("Deploy") {
            steps{                
                sh "docker-compose stop ${STRING}"
                sh "docker-compose build ${STRING}"
                sh "docker-compose up -d ${STRING}"
            }
        }
    }

  post {
      failure {
            step([$class: "Mailer", notifyEveryUnstableBuild: true, recipients: emailextrecipients([[$class: "CulpritsRecipientProvider"], [$class: "RequesterRecipientProvider"]])])      
        }
  }    
}
