/* cipher.js
 * Author: Hugo Perdomo
 * Usage: in terminal run >>  node cipher <cipher-text>.txt 
 * Preconditions: 
 * - NodeJS must be installed in the system prior to running this program
 * - There should be a .txt file where the cipher text is stored
 */
const fs = require('fs');  // NodeJS core file system library
let prospects = []; // array that will store the series of messages shifted

function readFile(filePath){ // read the file containing the encrypted message
  fs.readFile(filePath, 'utf-8', (err, data) =>{
    if(!err){
      decrypt(data);
    }else {
      console.log("Error trying to read the file...");
      console.error(err);
    }
  });
}

function decrypt(msg){ // loop through every character and shift them
  let result = "";
  let charcode;
  let shift = 0;
  while (shift < 26){
    for(var i = 0; i < msg.length - 1; i++){
        charcode = (msg[i].charCodeAt()) + shift; // get the char code
        charcode %= 91;
        charcode = (charcode < 65) ? charcode + 65: charcode;
        //console.log(`${msg[i]} shitted by ${shift}: ${String.fromCharCode(charcode)}`);
        result += String.fromCharCode(charcode); // add it to the string
    }
    prospects[shift] = result; // store prospect
    result = ""; // reset string
    shift++; // increment shift
  }
  writeProspects();
}

function writeProspects(){ // write all the combinations of the message in a file
  // If the file exists clean it up
  if(fs.existsSync(`${__dirname}/out.txt`)){
    fs.writeFileSync('out.txt', ``);
  }
  // loop through the prospect messages
  for(var n in prospects){
    // save them into a file
    fs.appendFileSync('out.txt', `k:${n}\t\tm = ${prospects[n]}\n`);
  }
  console.log("File decrypted!");
}
readFile(__dirname + '/' + process.argv[2]);
