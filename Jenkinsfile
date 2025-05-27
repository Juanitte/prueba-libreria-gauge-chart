pipeline {
  agent any

  environment {
    // Nombre de tu servicio / contenedor
    SERVICE_NAME = "web"
    // Tag de la build (puede ser BUILD_ID, GIT_COMMIT, etc)
    IMAGE_TAG    = "${env.BUILD_ID}"
  }

  stages {
    stage('Checkout') {
      steps {
        // Clona la rama (master) que Jenkins ya ha filtrado
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          // Construye la imagen y la etiqueta
          sh "docker build -t ${SERVICE_NAME}:${IMAGE_TAG} ."
        }
      }
    }

    stage('Stop & Remove Old Container') {
      steps {
        script {
          // Si existe un contenedor corriendo con ese nombre, lo para y elimina
          sh """
            if [ \$(docker ps -q -f name=${SERVICE_NAME}) ]; then
              docker rm -f ${SERVICE_NAME}
            fi
          """
        }
      }
    }

    stage('Run New Container') {
      steps {
        // Levanta la nueva imagen en segundo plano, exponiendo el puerto 80
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