pipeline {
    agent any

    options {
        timeout(time: 10, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        NODE_HOME = 'C:\\Program Files\\nodejs'

        NGINX_HOME = 'D:\\Nginx\\nginx-1.29.5'
        NGINX_HTML = 'D:\\Nginx\\nginx-1.29.5\\html'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/omkar3720/ReactApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React Vite App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to NGINX') {
            steps {
                bat '''
                echo Cleaning old files...
                if exist "%NGINX_HTML%" (
                    del /Q "%NGINX_HTML%\\*"
                )

                echo Copying new build...
                xcopy dist "%NGINX_HTML%" /E /I /Y
                '''
            }
        }

      stage('Restart NGINX') {
    steps {
        bat '''
        cd /d "%NGINX_HOME%"

        echo Stopping NGINX if running...
        taskkill /F /IM nginx.exe || echo NGINX was not running

        echo Starting NGINX in background...
        start "" nginx.exe
        exit /b 0
        '''
    }
}
    }

    post {
        success {
            echo '✅ React Vite App deployed successfully on NGINX'
        }
        failure {
            echo '❌ Deployment failed (check Jenkins infrastructure, not app)'
        }
    }
}
