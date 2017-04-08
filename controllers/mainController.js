const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawnSync;

exports.convetAudioToText = function (req, res) {
  // create an incoming form object
  const form = new formidable.IncomingForm();

  // // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../', '/uploads/opus');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  const filename = `${new Date().getTime()}`;
  form.on('file', (field, file) => {
    // fs.rename(file.path, path.join(__dirname, '../', `/${new Date().getTime()}.opus`));
    fs.rename(file.path, path.join(form.uploadDir, `${filename}.opus`));
  });

  // log any errors that occur
  form.on('error', (err) => {
    console.log(`An error has occured: \n${err}`);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    convertFileToFlac(filename);
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
};


function convertFileToFlac(filename) {
  const route = '/Users/Carlos/Desktop/FB-hackathon-server/';
  const folder_ouput = 'wav/';
  const folder_input = 'opus/'
  const opusdec = spawn(`${route}opus-tools-0.1.9/opusdec`, [`${route}uploads/${folder_input}${filename}.opus`, `${route}/uploads/${folder_ouput}${filename}.wav`]);

  console.log(`${opusdec.stdout.toString()}`);
  console.log(`${opusdec.stderr.toString()}`);
}
