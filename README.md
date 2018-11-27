## HowTo: File Path

- All video should be placed in /ming-project-server, then you can update the data.js file in /src/static
- In data.js file, the label should be same as the input json file name without .json extension(p1-remote and p1-science-t2 are included), key should be the same as the input video file with .mp4 extension

## HowTo: Setup

- run `npm install` in root folder and in /ming-project-server
- In root folder run `npm start`, this will start the front-end server at port 3000
- In /ming-project-server run `node index.js`, this will start the back-end server at port 8080

## Troubleshooting

This version is tested in Chrome only for now, and use p1-remote primarily.