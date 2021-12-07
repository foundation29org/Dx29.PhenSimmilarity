<div style="margin-bottom: 1%; padding-bottom: 2%;">
	<img align="right" width="100px" src="https://dx29.ai/assets/img/logo-Dx29.png">
</div>

Dx29 PhenSimilarity
==============================================================================================================================================

[![Build Status](https://f29.visualstudio.com/Dx29%20v2/_apis/build/status/DEV-MICROSERVICES/Dx29.PhenSimilarity?branchName=develop)](https://f29.visualstudio.com/Dx29%20v2/_build/latest?definitionId=112&branchName=develop)

### **Overview**

This project is used to obtain the differential diagnosis at the phenotypic level between a patient’s symptoms and those of a disease.

It is used in the [Dx29 application](https://dx29.ai/) and therefore how to integrate it is described in the [Dx29 architecture guide](https://dx29-v2.readthedocs.io/en/latest/index.html).


It is programmed in NodeJS, and the structure of the project is as follows:

>- src folder which contains the source code of the project.  
>>- The controllers folder contains the functionality to work with the previous method.
>>- In the routes folder, all the routes of the API appear. It contains the file index.js that links with the controllers, defining the requests that will be available to the external clients.
>>- In the services folder the functionality is implemented.
>>- Some files:
>>>- index.js: file where the app.js is loaded. It establish the port for connections and listens to requests.
>>>- Config.js: configuration file. It contains the keys and values that can be public.
>>>- App.js: the crossdomain is established.
>- .gitignore file
>- README.md file
>- manifests folder: with the YAML configuration files for deploy in Azure Container Registry and Azure Kubernetes Service.
>- pipeline sample YAML file. For automatizate the tasks of build and deploy on Azure.

<p>&nbsp;</p>

### **Getting Started**

####  1. Configuration: Pre-requisites

This project uses external services.

As a minimun, for local develop it is mandatory to configure the file config.js: 
This project deppends on Dx29.Bioentity, so in config file we must include: {"f29bio":"http://dx29-bioentity"}

That is, you need to have the Docker image of the Dx29.Bioentity project downloaded and deployed locally. 
Documentation on how to do this is available at:
>- [Dx29.Bioentity](TODO._Link_github)

<p>&nbsp;</p>

####  2. Download and installation

Download the repository code with `git clone` or use download button.

Run ```npm install``` to install the dependencies.


<p>&nbsp;</p>

####  3. Latest releases

The latest release of the project deployed in the [Dx29 application](https://dx29.ai/) is: v0.15.00.

<p>&nbsp;</p>

#### 4. API references

**Getting the differential diagnosis between two list of symptoms**:
>- POST request
>- URL: http://127.0.0.1:8080/api/v1/calculate
>- Body request: 
> ``` {"list_reference":<list of the patient symptoms ids (string)>, 
"list_compare":<list of the disease symptoms ids (string)>]} ```
>- Result request: List of objetcs with:
>>- Symptom identifier (HP)
>>- HasPatient and HasDisease booleans, indicating if the patient and if the disease has or not this symptom.
>>- RelatedId: if the symptom is present in patient or disease by inheritance, here appears the related symptom identifier that has been used to assume the value of the previous booleans.
>>- Relationship: Relationship between symptom and related symptom (Equals, Predeccessor or Successor)
>>- Score: Relationship type score

<p>&nbsp;</p>

### **Build and Test**

#### 1. Build

We could use Docker. 
Docker builds images automatically by reading the instructions from a Dockerfile – a text file that contains all commands, in order, needed to build a given image.

>- A Dockerfile adheres to a specific format and set of instructions.
>- A Docker image consists of read-only layers each of which represents a Dockerfile instruction. The layers are stacked and each one is a delta of the changes from the previous layer.

Consult the following links to work with Docker:

>- [Docker Documentation](https://docs.docker.com/reference/)
>- [Docker get-started guide](https://docs.docker.com/get-started/overview/)
>- [Docker Desktop](https://www.docker.com/products/docker-desktop)

The first step is to run docker image build. We pass in . as the only argument to specify that it should build using the current directory. This command looks for a Dockerfile in the current directory and attempts to build a docker image as described in the Dockerfile. 
```docker image build . ```

[Here](https://docs.docker.com/engine/reference/commandline/docker/) you can consult the Docker commands guide.

<p>&nbsp;</p>

#### 2. Deployment

To work locally, it is only necessary to install the project. 

The deployment of this project in an environment is described in [Dx29 architecture guide](https://dx29-v2.readthedocs.io/en/latest/index.html), in the deployment section. In particular, it describes the steps to execute to work with this project as a microservice (Docker image) available in a kubernetes cluster:

1. Create an Azure container Registry (ACR). A container registry allows you to store and manage container images across all types of Azure deployments. You deploy Docker images from a registry. Firstly, we need access to a registry that is accessible to the Azure Kubernetes Service (AKS) cluster we are creating. For this purpose, we will create an Azure Container Registry (ACR), where we will push images for deployment.
2. Create an Azure Kubernetes cluster (AKS) and configure it for using the prevouos ACR
3. Import image into Azure Container Registry
4. Publish the application with the YAML files that defines the deployment and the service configurations. 

This project includes, in the Deployments folder, YAML examples to perform the deployment tasks as a microservice in an AKS. 
Note that this service is configured as "ClusterIP" since it is not exposed externally in the [Dx29 application](https://dx29.ai/), but is internal for the application to use. If it is required to be visible there are two options:
>- The first, as realised in the Dx29 project an API is exposed that communicates to third parties with the microservice functionality.
>- The second option is to directly expose this microservice as a LoadBalancer and configure a public IP address and DNS.

>>- **Interesting link**: [Deploy a Docker container app to Azure Kubernetes Service](https://docs.microsoft.com/en-GB/azure/devops/pipelines/apps/cd/deploy-aks?view=azure-devops&tabs=java)

<p>&nbsp;</p>

####  3. Testing

A list of available unit tests has been defined in the spec folder of the project.
Run ```npm run tests``` to execute the unit tests with [Jasmine](https://jasmine.github.io/setup/nodejs.html).

<p>&nbsp;</p>

### **Contribute**

Please refer to each project's style and contribution guidelines for submitting patches and additions. The project uses [gitflow workflow](https://nvie.com/posts/a-successful-git-branching-model/). 
According to this it has implemented a branch-based system to work with three different environments. Thus, there are two permanent branches in the project:
>- The develop branch to work on the development environment.
>- The master branch to work on the test and production environments.

In general, we follow the "fork-and-pull" Git workflow.

>1. Fork the repo on GitHub
>2. Clone the project to your own machine
>3. Commit changes to your own branch
>4. Push your work back up to your fork
>5. Submit a Pull request so that we can review your changes

The project is licenced under the **(TODO: LICENCE & LINK & Brief explanation)**

<p>&nbsp;</p>
<p>&nbsp;</p>

<div style="border-top: 1px solid !important;
	padding-top: 1% !important;
    padding-right: 1% !important;
    padding-bottom: 0.1% !important;">
	<div align="right">
		<img width="150px" src="https://dx29.ai/assets/img/logo-foundation-twentynine-footer.png">
	</div>
	<div align="right" style="padding-top: 0.5% !important">
		<p align="right">	
			Copyright © 2020
			<a style="color:#009DA0" href="https://www.foundation29.org/" target="_blank"> Foundation29</a>
		</p>
	</div>
<div>