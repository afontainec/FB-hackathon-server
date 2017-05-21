const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawnSync;
const Speech = require('@google-cloud/speech');

// const route = '/home/ubuntu/FB-hackathon-server/';
const route = '/Users/Carlos/Desktop/FB/FB-hackathon-server/';
const folder_input = 'Extras/uploads/opus/';
const folder_ouput = 'Extras/uploads/wav/';
const dec_command = 'Extras/OpusTools/opusdec';
const output_ext = '.wav'

exports.convertAudioToText = function (req, res) {
  // create an incoming form object
  const form = new formidable.IncomingForm();

  // // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../', '/Extras/uploads/opus');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  const filename = `${new Date().getTime()}`;
  form.on('file', (field, file) => {
    fs.rename(file.path, path.join(form.uploadDir, `${filename}.opus`));
  });

  // log any errors that occur
  form.on('error', (err) => {
    console.log(`An error has occured: \n${err}`);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    const wavfile = convertFileToWav(filename);
    console.log(' [!] Opus File Transform to .Wav')
    convertToText(wavfile, res);
  });

  // parse the incoming request containing the form data
  form.parse(req);
};


function convertFileToWav(filename) {
  spawn(`${route}${dec_command}`, 
        [`${route}${folder_input}${filename}.opus`, 
         `${route}${folder_ouput}${filename}.wav`]);
  return `${filename}`;
}

function convertToText(wavfile, res) {
  // Your Google Cloud Platform project ID
  const projectId = process.env.PROJECT_ID;

  // Instantiates a client
  const speechClient = Speech({
    projectId,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });

    // The name of the audio file to transcribe
  const fileName = `${route}${folder_ouput}${wavfile}${output_ext}`;


  const options = {
    encoding: 'LINEAR16',
    // languageCode: 'es-CL'
  };


  // Detects speech in the audio file
  speechClient.recognize(fileName, options)
    .then((results) => {
      const transcription = results[0];
      console.log(`[+] Transcription: ${transcription}`);

      // Writing Results for future Transalations
      fs.writeFile(`${route}${folder_ouput}Text/${wavfile}.txt`, transcription, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 

      res.end(transcription);
      return transcription;
    }).catch((err) => {
      console.log('[!] Ocurrio un error');
      console.log(err);
    });
}
