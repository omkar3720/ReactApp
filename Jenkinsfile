pipeline {
    agent any

    tools {
        jdk 'jdk-home'
        maven 'maven-home'
    }

    stages {

        // ---------------- Checkout ----------------
        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/omkar3720/ReactAppBackend.git'
            }
        }

        // ---------------- Build & Deploy ----------------
        stage('Build And Deploy') {
            stages {

                stage('Build') {
                    steps {
                        echo "Building project for Dev..."
                        bat 'mvn clean install -DskipTests'
                    }
                }

                stage('Deploy') {
                    steps {
                        echo "Deploying to Tomcat..."
                        bat '''
                        copy "C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\BackendPipeline\\target\\ReactAppBackend-0.0.1-SNAPSHOT.war" ^
                             "D:\\Desktop\\Tomcat1\\apache-tomcat-10.1.52\\webapps\\"
                        '''
                    }
                }

            }
        }
    }
}
