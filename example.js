const spawn = require('child_process').spawnSync;
const ls = spawn('opus-tools-0.1.9/opusdec', ['example/audio.opus', 'uploads/fff.wav']);

console.log(`stderr: ${ls.stderr.toString()}`);
console.log(`stdout: ${ls.stdout.toString()}`);
