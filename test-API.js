/*eslint-disable*/
'use strict';

var serverURL = "http://localhost:3000/convert";
var filePath = '';

var audio = {
  uri: filePath,
  type: 'audio/ogg',
  name: 'audio.opus',
};
var body = new FormData();
body.append('audio', audio);
var xhr = new XMLHttpRequest();
xhr.open('POST', serverURL);
xhr.send(body);

RNFS.readFile(filePath, 'base64').then((content) => {
  this.setState({
    isLoading: false,
    result: 'hola'
  })
})
