# IOTGingerbread

This is a project I created for the raspberry Pi to be inserted inside a gingerbread house to control blinking lights, music, and a magical "fireplace" that glows green when everybody is nice, but red when somebody has been naughty.  This repository contains the software that acts as the UI (HTML page served up by an express web server), and the backend server (a Rest Service also served up by the express web server) in the form a single NodeJS service.

####How to configure the software:
1) Run Raspbian Wheezy and install NodeJS and Npm on your pi

2) I had to manually set the default output of the pi to be the aux jack instead of the HTML port.   I ran this command <i>$amixer cset numid=3 1</i>

3) Clone the github respository.

4) run "npm install" to download and compile the necessary dependancies.   If you get an error when compiling and installing the "speaker" dependancy of the "player" dependancy (ie asoundlib.h not found), trying manually installing the sound library asound.   Run the command <i>sudo apt-get install libasound2-dev</i> to do this

5) edit the appServer.js file to replace the one place in the code that says [IP ADDRESS OF YOUR PI] in the code to be the internal IP address of your raspberry pi on your network.

6) startup the app serve...run  <i>sudo nodejs appServer.js</i>

7) on a browser, load the URL:  <i>http://[IP ADDRESS OF YOUR PI]:8082/houseControl.html</i>   

8) Control the gingerbread house using the buttons on the html page

