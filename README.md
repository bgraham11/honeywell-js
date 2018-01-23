# honeywell-js
Very simple Node/Express web server to connect to your Honeywell home automation devices.

This is currently a work in-progress and is meant only to be used as a proof of concept for your own home automation project.

I will update the documentation as time progresses, as it is quite scarce. Please contact me directly if you have any questions.

Current Supported Devices
- Lyric™ T5 Wi-Fi

Requirements
- NodeJS installed on a computer/server. This doesn't need to be local as the Honeywell API isn't local
- Lyric™ T5 Wi-Fi installed correctly and connected to your Wifi

Instructions
- Navigate to https://developer.honeywell.com and register a developer account
- Create a "New App" and follow the instructions
- Clone this repository
- Run "npm install" from the root of this project
- Open "config/options.global.js" and fill out the require configurations. Leave the port as '3000' unless you change the settings in the express server.
- Run "npm start"
- Access URL you used in the global.options.js in your browser. 
- Login via your Honeywell Account (not developer account), and select your thermostat.
