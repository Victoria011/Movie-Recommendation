## Instructions on how to run the program.

This project is implemented mainly with Python3.9, React, Flask and Tensorflow==2.5.0. It has been tested to run with Python3.8 as well. To run the project, it is advised to create a virtualenv and install all the libraries in requirements.txt. 

For installing React with node.js: https://nodejs.org/en/download/

Then in terminal, go to the project folder.

`cd movie-recommendation-app/`

For creating virtual environment:

`python3.9 -m venv py3.9` (or anyname of your choice) 

or 

`python3.8 -m venv py3.8` (if you don’t have Python 3.9)

For activating virtual environment:

`. py3.9/bin/activate`

 (substitute py3.9 with your virtual environment name)

or

`. py3.8/bin/activate`

For installing all the libraries:

`pip install -r requirements.txt` 

Then change the ‘py3.8’ with the name of your virtual environment in the ‘package.json’ file in the ‘movie-recommendation-app’ folder as the figure shown below. Note that our virtual environment folder ‘py3.8’ is outside the ‘movie-recommendation-app’ folder.![img](https://lh4.googleusercontent.com/XsATWPFarwRxJnJixEHHpjhMNZyoVK6JkLFfIpCfM1t9mk27PyXm_VVOLMViyRpufl24jTKZIrYY2TMTOZXcZs4C-qmr-UjYdvg9aiZB_OnjRdvGVG39JwSpExL4OQ)Figure: changes for virtual environment name in movie-recommendation-app/package. json file.

Our folder structure is shown below (py3.8 is the virtual environment name we used). You could have an additional folder named the virtual environment you just created.![img](https://lh6.googleusercontent.com/8zOmbuxB8QCmK1GR5fnIVk1O83FdAe08vsKaIdZnzpbrfOkAcwrM3WlFwgHe_UQIzvGtFbjZvUvUfvMeUvAjccSQg6Ok4MqqCphRNS_LZMmxm6v3kngLjloHcMYVhQ)

Please make sure you have compatible versions for Python, React, Flask, Tensorflow and Pyspark before running the project.

To run the project, please open two terminals for running the backend side and the front end side. For back-end side, go to ‘movie-recommendation-app’ folder and type the following command in the terminal: npm run start-flask
For front-end side, go to ‘movie-recommendation-app’ folder and type the following command in the terminal: npm start
Then the website could be viewed in ‘http://localhost:3000/’.

If an alert message shown as below for mac, go to settings > Security & Privacy and click ‘Allow Anyway’![img](https://lh5.googleusercontent.com/b0BqWoCiebHZ3BP06mrO-ZTFvC0yCZgkh00NsQGlkUlN2_rvkAvoFYWepEc3Rqh9prOfDMHOW6vVHkSL4kUuymfFjy-9noVSCMF2pS8IEjW_wR_hnlO2FNBOlliPTw)

If encountered the error message as shown below, please go to the correct folder ‘cd movie-recommendation-app/’.![img](https://lh5.googleusercontent.com/m1f1th5ptE6pck6Zb1E_xrgvcIwZkysdcM97SwvDYyNNzyhmIhHvcHT-71kyeoSPE-sApBugipNJJ57O3Yc8YtqDgoYHE4avwMZRynDqS-tmNq47_JayBQDyHBW1rQ)