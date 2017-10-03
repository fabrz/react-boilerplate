const argv = require('minimist')(process.argv.slice(2));
const gaze = require('gaze');
const exec = require('child_process').exec;

gaze(argv._, function(err, watcher) {
  console.log('Watching ...');

  this.on('all', (event, filepath) => {
    const fileext = filepath.split('.').pop();
    let task = '';

    if (fileext === 'scss') {
      task = 'make css';
      console.log('Making css ...');
    }

    exec(task, (error, stdout, stderr) => {
      if (error !== null) {
        console.log(`Task ${task} failed`);
        console.log(error);

        return;
      }

      console.log(stderr);
      console.log(`Task ${task} run successfully`);

      if (stdout) {
        console.log(stdout);
      }
    });
  });
});
