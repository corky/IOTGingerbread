# IOTGingerbread

This is a project I created for the raspberry Pi to be inserted inside a gingerbread house to control blinking lights, music, and a magical "fireplace" that glows green when everybody is nice, but red when somebody has been naughty.

####How to configure the software:
1) Run Raspbian Wheezy and install NodeJS on your pi
2) I had to manually set the default output of the pi to be the aux jack instead of the HTML port.   I ran this command $amixer cset numid=3 1
3) Clone the respository.   
4) run npm install to download and compile the necessary dependancies
5) edit the appServer.js file to replace the one place in the code that says [IP ADDRESS OF YOUR PI] in the code to be the internal IP address of your raspberry pi on your network.
6) startup the app serve...run  "sudo nodejs appServer.js"
7) on a browser, load the URL:  http://[IP ADDRESS OF YOUR PI]:8082/houseControl.html   
8) Control the gingerbread house using the buttons on the html page
