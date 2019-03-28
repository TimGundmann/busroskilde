def string = "blue"
def old = "green"

pipeline {
    agent any

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
                    if (verifyUrl("https://busroskilde.dk/blue/index.html")) {
                        string = "green"
                        old = "blue"
                    }
                    currentBuild.displayName = "Version: 1.0.${currentBuild.number} Delpoy to string ${string}"
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
                sh "docker-compose stop ${string}"
                sh "docker-compose build ${string}"
                sh "docker-compose up -d ${string}"
                echo "Container up on string ${string}"
            }
        }

        stage("E2E-test") {
            steps{
                wrap([$class: "Xvfb", displayName: 1]) {
                    sh "ps -aux | grep Xvfb"
                    sh "export DISPLAY=:1"
                    withCredentials(
                        [usernamePassword(credentialsId: 'busroskilde-test', 
                        passwordVariable: 'TEST_PASSWORD', usernameVariable: 'TEST_EMAIL')]) {                    
                        sh 'echo { "email": ${TEST_EMAIL}, "password": "${TEST_PASSWORD}" } > signin.auth.json'    
                    }   
                    sh "ng e2e --base-url http://localhost:${findCurrentPort(string)}"
                }
            }                
        }

        stage("Verify") {
            steps{       
                script {
                    updateConfig(findCurrentPort(string))
                    sh "curl -X POST http://192.168.1.100:8764/actuator/refresh"
                    sh "docker-compose stop ${old}"
                    echo "Success full deploy and change to ${string}"
                }         
            }
        }
    }

  post {
      failure {
            step(
                [
                    $class: "Mailer", 
                    notifyEveryUnstableBuild: true, 
                    recipients: emailextrecipients([
                            [$class: "CulpritsRecipientProvider"], 
                            [$class: "RequesterRecipientProvider"]
                        ])
                    ]
            )      
        }
  }    
}

boolean verifyUrl(String url) {
    return sh(
            script: "curl -o /dev/null -s -w '%{http_code}\\n' '${url}'", 
            returnStdout: true
        ).trim()  == '200';
}

String findCurrentPort(String string) {
    def dockerFile = readYaml file: 'docker-compose.yaml'
    def port = dockerFile.services.green.ports[0]
    if (string == 'blue') {
        port = dockerFile.services.blue.ports[0]
    }
    return port.substring(0, port.indexOf(':'));
}

void updateConfig(String port) {
    sh 'rm -rf config'
    dir('config') {
        withCredentials([usernamePassword(credentialsId: 'bfb902c7-52ec-4261-b92f-978123c97189', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
            sh 'git config --global user.email "tim@gundmann.dk"'
            sh 'git config --global user.name "Tim Gundmann"'
            sh 'git config --global push.default simple'

            sh 'git clone https://github.com/TimGundmann/gundmann-config.git .'

            def zuul = 'zuul-prod.yaml'
            def data = readYaml file: zuul
            def newUrl = "http://localhost:${port}"
            if (data.zuul.routes.bus.url != newUrl) {
                data.zuul.routes.bus.url = newUrl
                sh "rm ${zuul}"
                writeYaml file: zuul, data: data     

                sh "git add ${zuul}"
                sh "git commit -m 'Busroskilde change port to ${port}'"
                sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/TimGundmann/gundmann-config.git')
            }
        }        
    }
}