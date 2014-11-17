var fs = require("fs");

var file = __dirname + '/.blogilepassword';
var pw = process.argv[2];

if(fs.existsSync(file)){
    fs.unlinkSync(file);
}

var sha1 = require('sha1');
var crypto = require('crypto');

function md5(name){
    return crypto.createHash('md5').update(name).digest('hex');
}

var pwa = md5(pw).substr(0,8);
var pwb = sha1(pw.substr(0,4) + pwa);
var pwc = md5(pwb + pwb.substr(3,11) + "Poweredbytypcn");
var pwd = sha1(pwc+pwc+pwb);
console.log("The hashed password is: " + pwd);

fs.writeFile(file, pwd, function (err) {
  if (err) { console.log("Save failed ! Please save the hashed password string in '.blogilepassword' file manually.") };
  console.log("Save Success , Have fun.");
});