import '../helpers/index.js';


const context = require.context('./', true, /\.spec\.js$/);
context.keys().forEach(context);
