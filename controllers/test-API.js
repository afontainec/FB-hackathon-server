/*eslint-disable*/
'use strict';

// [START speech_quickstart]
// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'a59e2f4f7fb16a45a5d6eca69bde21d63ce202ef';

// Instantiates a client
const speechClient = Speech({
  projectId,
});

  // The name of the audio file to transcribe
  const fileName = '../uploads/audio.wav'


const options = {
  encoding: 'LINEAR16',
  // languageCode: 'es-CL'
};



// Detects speech in the audio file
speechClient.recognize(fileName, options)
  .then((results) => {
    const transcription = results[0];
    console.log(`Transcription: ${transcription}`);
  }).catch((err) =>{
    console.log('hubo un error');
    console.log(err);
  });
// // [END speech_quickstart]
