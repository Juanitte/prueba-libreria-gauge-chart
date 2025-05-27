pipeline {
  agent any

  environment {
    SERVICE_NAME = "web"
    IMAGE_TAG    = "${env.BUILD_ID}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh "docker build -t ${SERVICE_NAME}:${IMAGE_TAG} ."
        }
      }
    }

    stage('Remove Old Container') {
      steps {
        // Si existe, lo elimina; si no, ignora el error
        sh "docker rm -f ${SERVICE_NAME} || true"
      }
    }

    stage('Run New Container') {
      steps {
        sh "docker run -d --name ${SERVICE_NAME} -p 80:80 ${SERVICE_NAME}:${IMAGE_TAG}"
      }
    }
  }

  post {
    success {
      echo "✅ Despliegue completado: ${SERVICE_NAME}:${IMAGE_TAG}"
    }
    failure {
      echo "❌ Algo falló durante el deploy."
    }
  }
}