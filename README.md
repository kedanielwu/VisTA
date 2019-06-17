## Overview

Web-based user interface for think-aloud session analysis developed in React.js and MobX.js.  
I am still working on providing more functionality and UI changes, as well as mkaing the tool useful for more general purpose.

## Setup
* This tool currently require ``Nodejs``, to install please visit https://nodejs.org/en/, LTS version is prefered.  
* This tool currently contains a front-end and a back-end part, I am working on remove the back-end portion. For now, to run the app please follow the instruction.

1. Installation:

On root folder, run the command `npm install`

On root folder, run the command `cd ming-project-server`

On `~/ming-project-server`, run the command `npm install`

2. Back-end:

On `~/ming-project-server`, run the command `node index.js`

The back-end server will run on port `8080`

3. Front-end:

On root foler, run the command `npm start`

The front-end server will run on port `80`

## Data
All the video record and pre-processed session record should be placed in `~/src/static` and correctly registered in `~/src/static/data.js`

### registeration format
Every session is resigtered as label-key pair where `label` indicate the session name and `key` indicate the video file name. (** here label is used as key for mapping**)

## Download

All the user input including interaction with certain part of the app will be recorded and can be download by clicking finish button at the top  
To start the recording, you need first enter a `userID` and then click start button at the top to start recording

## Code structure
This app contains 5 major UI components, including video player, main prediction chart, detail feature chart, problem recording form, and highlight filter.  
All the UI components is listening to a central data store and when connected data field is updated the UI component will be re-rendered to show the change. Basically a user interaction on the chart or the video player will trigger the data store update and UI re-render, thanks to MobX.js.



