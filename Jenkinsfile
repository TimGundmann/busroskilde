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
   //            sh "npm install"
               sh "npm version 1.0.${currentBuild.number}"
               script {
                    if (verifyUrl("https://busroskilde.dk/blue/index.html")) {
                        string = "green"
                        old = "blue"
                    }
                    currentBuild.displayName = "Version: 1.0.${currentBuild.number} Delpoy to: ${string}"
               }
            }                
        }
        
        // stage("Test") {
        //     steps{
        //         wrap([$class: "Xvfb", displayName: 1]) {
        //             sh "ps -aux | grep Xvfb"
        //             sh "export DISPLAY=:1"
        //             sh "ng test --watch false"
        //         }
        //     }                
        // }

        // stage("Build") {
        //     steps{   
        //         sh "ng build --prod"
        //     }
        // }
        // stage("Deploy") {
        //     steps{                
        //         sh "docker-compose stop ${string}"
        //         sh "docker-compose build ${string}"
        //         sh "docker-compose up -d ${string}"
        //     }
        // }
        stage("Verify") {
            steps{       
                script {
                    def port = findCurrentPort(string);
                    if (verifyUrl("http://localhost:${findCurrentPort(port)}")) {
                        updateConfig(port);
                        echo "Success full deploy to ${string}"
                    }
                }         
            }
        }
    }

//   post {
//       failure {
//             step([$class: "Mailer", notifyEveryUnstableBuild: true, recipients: emailextrecipients([[$class: "CulpritsRecipientProvider"], [$class: "RequesterRecipientProvider"]])])      
//         }
//   }    
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
    dir('config') {
        withCredentials([usernamePassword(credentialsId: 'bfb902c7-52ec-4261-b92f-978123c97189', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
            sh 'git clone https://github.com/TimGundmann/gundmann-config.git .'

            def zuul = 'zuul-prod.yaml'
            def data = readYaml file: zuul
            data.zuul.routes.bus.url = "http://localhost: ${port}"
            sh "rm ${zuul}"
            writeYaml file: zuul, data: data     

            sh "git add ${zuul}"
            sh "git commit -m 'Busroskilde change port to ${port}'"

            sh('git push')
        }        
    }
}