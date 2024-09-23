// // import dotenv from 'dotenv'
// import 'dotenv/config'
// // require("dotenv").config(); // Require is not defined in ES module scope, you can use import instead.
// console.log(process.env.HIDDEN_API_KEY); // prints undefined.
    
import 'dotenv/config'
require("dotenv").config();
console.log(process.env.HIDDEN_API_KEY);
console.log("poop");