pipeline {
	agent any

	parameters{
		string(name: 'VERSION',defaultvalue: 'main', description: 'Release version to be deployed')
	}

	environment {
        	DEPLOY_PATH = credentials('backend-deployment-destination') 
        	GITHUB_API_TOKEN = credentials('github-api-token') 
        	SERVER_CREDENTIALS_ID = credentials('server-ssh-key') 
        	SERVER_IP = credentials('server-ip')
		SOURCE = credentials('source-path')
		BACKEND = credentials('backend-path-repo')
    	}

	stages {
        	stage('Checkout Code') {
            		steps {
	                	script {
                    			// Checkout code from the GitHub branch
        	            		git branch: params.VERSION, credentialsId: ${GITHUB_API_TOKEN}, url: 'https://github.com/${SOURCE}'
                		}
            		}
        	}

        	stage('Deploy to Server') {
            		steps {
                		script {
                    			// Set the path to deploy the backend
                    			def backendFolder = ${BACKEND}'  // Folder inside your repo to deploy
                    			def serverPath = ${DEPLOY_PATH}.trim()

                    			// Run SSH commands to deploy to the server
                    			sh """
                    			scp -r ${backendFolder} ${SERVER_CREDENTIALS_ID}@${SERVER_IP}:${serverPath}
                    			"""
                		}
            		}
        	}
    	}

    	post {
        	success {
            		echo 'Deployment Successful!'
        	}
        	failure {
            		echo 'Deployment Failed!'
        	}
    	}
}
