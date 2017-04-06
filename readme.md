Readme.md

Campaign Analytics


Angular UI app for Campaign Analytics -------------------------------------------------

The node application is structured in the following way

+ app
   - app.js				- app is being created here.
   + controllers
     - tableCtrl.js 			- Resposible for country display table.
   + services
     - dataService.js 			- Fetches data from restful end-point.
     - filterService.js 		- Functioality of filtering and searching.
   + utils
     - searchUtils.js 			- Includes functions related to search operations.
+ views
   - index.html				- home of application.


------------------
To start: in the root folder : python -m SimpleHTTPServer 8000