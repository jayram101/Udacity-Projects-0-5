This is a modified Cameron Site.

FOLDERS: There are many folders and files as follows:

a) Source and distribution folders named 'src' and 'dist' respectively. The original app files are all in src folders. The dist folders contain minified or tested files generated automatically by GRUNT. 'dist' is ready for deployment.
b) 'src' files are not processed. 'node_modules' installed by npm are configured in the package.json file to use these modules and process the files in 'src'.
c) gruntfile.js is the configured workflow that automates the test/minification steps.
d) the Other folder contains timing results using PageSpeed and Google developer tools. NPM and configuration of Grut are from sites:  https://www.npmjs.com/ http://gruntjs.com/

e) Minor changes were made primarily to main.js in the src/views/js


<li> In function changePizzaSizes created the new object 'randomPizzaObject' to hold the pizza container elements; iterate and make the size changes; and then in a loop update the randomPizzaContainer DOM elements with the new size.  </li>

<li> Moved the following outside the for loop at about line 492
'var pizzasDiv = document.getElementById("randomPizzas");'

<li> Changed the document.addEventListener function to load only those pizzas that are likely to be visible but computing the visible variable based on the screen height and pizza px's. </li>

<li> Moved the access to the DOM in  var elem = document.createElement('img')
outside the for loop in document.addEventListener</li>


f) Changes were also make to the style.css under views/css; the following were added: 
<li>backface-visibility: hidden;</li>
<li>transform: translateZ(0);</li>