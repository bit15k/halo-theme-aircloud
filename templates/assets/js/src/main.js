let aircloud = require('./aircloud')
let tocbot = require('./tocbot')
let pageFocus = require('./page-focus')
tocbot();
aircloud();
pageFocus();



// browserify templates/assets/js/src/main.js -o templates/assets/js/dist/aircloud.js
// watchify templates/assets/js/src/main.js -d -o templates/assets/js/dist/aircloud.js -v

