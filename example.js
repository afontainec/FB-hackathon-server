const fs = require('fs');
const request = require('request');


const formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  my_buffer: new Buffer([1, 2, 3]),
  // Pass data via Streams
  file: fs.createReadStream(`${__dirname}/audio.opus`),
};

request.post({
  url: 'http://localhost:3000/upload',
  data: formData,
  processData: false,
  contentType: false,
}, (err, httpResponse, body) => {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
