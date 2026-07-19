# CI/CD NodeJs app

This repository contains a simple, premium-looking Node.js application built with Express. It serves as a demonstration for implementing a complete modern CI/CD pipeline using Docker, GitHub Actions, and GitOps (ArgoCD) on a local Kubernetes (Kind) cluster.

## 🚀 Features
- **Modern UI**: A dark-themed, responsive web interface tailored for video content (HTML/CSS/JS).
- **Express Backend**: A lightweight Node.js API to serve static files and video metadata.
- **Dockerized**: Includes a `Dockerfile` and `docker-compose.yml` for easy containerization.
- **Automated GitOps CI/CD**: A GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the Docker image and updates the Kubernetes manifests. ArgoCD automatically syncs these changes to the Kubernetes cluster.

## 📋 Prerequisites

Before starting, ensure you have the following installed on your local machine:
- [Docker](https://docs.docker.com/get-docker/) (Required for both Docker Compose and Kubernetes)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) (Required to interact with the Kubernetes cluster)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) (Required to spin up the local Kubernetes cluster)
- [ArgoCD CLI](https://argo-cd.readthedocs.io/en/stable/cli_installation/) (Optional but recommended for managing ArgoCD)

## 🛠️ How to Run Locally

You can run this project locally using standard Node.js, Docker Compose, or Kubernetes.

### Option 1: Using Node.js
Ensure you have Node.js installed.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

### Option 2: Using Docker Compose
Ensure you have Docker and Docker Compose installed.

1. Build and run the container:
   ```bash
   docker compose up --build
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Option 3: Using Kubernetes (Kind & ArgoCD)
Ensure you have Docker, `kind`, and `kubectl` installed.

1. **Create the Kind Cluster:**
   ```bash
   kind create cluster --config kind-config.yaml --name cicd-cluster
   ```
2. **Install ArgoCD on the cluster:**
   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```

3. **Connect ArgoCD to this Repository:**
   Set up an ArgoCD Application to watch the `k8s/` directory of this repository. When you apply the ArgoCD application manifest, it will automatically deploy the `deployment.yaml` and `service.yaml`.

4. **Access the Application:**
   Because the service is a `ClusterIP`, you can access it via port forwarding:
   ```bash
   kubectl port-forward svc/cicd-app-service 3000:3000
   ```
   Open your browser and navigate to `http://localhost:8080`.

## 🔄 CI/CD Pipeline (GitOps)

The CI/CD pipeline is fully automated and triggered on pushes to the `main` branch. 

**Workflow Steps (`deploy.yml`):**
1. **CI Phase - Build & Push**:
   - Checks out the code.
   - Logs into DockerHub using secrets.
   - Builds the Docker image tagged with the unique GitHub commit SHA (`${{ github.sha }}`).
   - Pushes the image to DockerHub.
   
2. **CD Phase - Update Manifest**:
   - Uses `sed` to dynamically update `k8s/deployment.yaml` with the new image tag.
   - Commits the updated manifest back to the `main` branch with a `[skip ci]` flag to prevent infinite loops.

3. **GitOps Phase - ArgoCD Sync**:
   - ArgoCD detects the new commit in the `k8s/` directory.
   - It automatically pulls the changes and updates the Kubernetes cluster with the new Docker image.

### 🔑 Required GitHub Secrets
To make the deployment pipeline work, you must add the following secrets in your GitHub repository settings (**Settings > Secrets and variables > Actions**):

| Secret Name | Description |
| :--- | :--- |
| `DOCKERHUB_USERNAME` | Your DockerHub account username. |
| `DOCKERHUB_TOKEN` | A Personal Access Token (PAT) from DockerHub. |

*(Note: The EC2 secrets previously required are no longer needed since we migrated to Kubernetes/ArgoCD).*

## 📝 License
This project is open-source and available for educational purposes.
