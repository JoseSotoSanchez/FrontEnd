pipeline {
    agent any
    stages{

         stage('Build frontend') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/JoseSotoSanchez/FrontEnd']])
                bat 'npm install'
                bat 'npm run build'
            }
         }

        stage('Build frontend docker image'){
            steps{
                script{
                    bat 'docker build -t josesotosa/autofix-frontend:latest .'
                }
            }
        }

        stage('Push image frontend to Docker Hub'){
            steps{
                script{
                   bat 'docker login -u josesotosa -p %asd123asd%'
                   bat 'docker push josesotosa/autofix-frontend:latest'
                }
            }
        }
    }
}