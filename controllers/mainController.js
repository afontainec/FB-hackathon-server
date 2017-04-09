const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawnSync;
const Speech = require('@google-cloud/speech');

const route = '/home/ubuntu/FB-hackathon-server/';

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
    const wavfile = convertFileToWav(filename);
    convertToText(wavfile, req, res);
  });

  // parse the incoming request containing the form data
  form.parse(req);
};


function convertFileToWav(filename) {
  const folder_ouput = 'wav/';
  const folder_input = 'opus/';
  spawn(`${route}opus-tools-0.1.9/opusdec`, [`${route}uploads/${folder_input}${filename}.opus`, `${route}/uploads/${folder_ouput}${filename}.wav`]);
  return `${filename}.wav`;
}

function convertToText(wavfile, req, res) {
  const languageCode = req.params.language;
  // Your Google Cloud Platform project ID
  const projectId = 'a59e2f4f7fb16a45a5d6eca69bde21d63ce202ef';

  // Instantiates a client
  const speechClient = Speech({ //eslint-disable-line
    projectId,
  });

    // The name of the audio file to transcribe
  const fileName = `${route}uploads/wav/${wavfile}`;


  const options = {
    encoding: 'LINEAR16',
    languageCode,
  };


  // Detects speech in the audio file
  speechClient.recognize(fileName, options)
    .then((results) => {
      const transcription = results[0];
      console.log(`Transcription: ${transcription}`);
      res.end(transcription);
      return transcription;
    }).catch((err) => {
      console.log('[!] Hubo un error');
      console.log(err);
    });
}
