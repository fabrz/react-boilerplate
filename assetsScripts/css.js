require('es6-promise').polyfill();

const argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const flexbugfixes = require('postcss-flexbugs-fixes');
const glob = require('glob');
const postcss = require('postcss');
const pxtorem = require('postcss-pxtorem');

const autoprefixerOpts = {
  browsers: [
    'last 4 versions',
    'IE >= 9',
    'not IE <= 8',
  ],
};

const cssnanoOpts = {
  zindex: false,
  discardUnused: false,
  autoprefixer: false,
};

const pxtoremOpts = {
  replace: false,
  mediaQuery: false,
};

const processor = postcss([
  flexbugfixes(),
  autoprefixer(autoprefixerOpts),
  pxtorem(pxtoremOpts),
  cssnano(cssnanoOpts),
]);

const processCss = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    processor.process(data, {
      from: filePath,
      to: filePath,
      map: {
        inline: false,
      },
    })
    .then((result) => {
      fs.writeFileSync(filePath, result.css);

      if (result.map) {
        fs.writeFileSync(`${filePath}.map`, result.map);
      }
    }, (error) => {
      console.log('Error!', error);
    });
  });
};

const render = (error, files) => {
  for (let i = files.length - 1; i >= 0; i--) {
    processCss(files[i]);
  }
};

function init(directory) {
  glob(`${directory}.css`, {}, render);
}

init(argv.directory);
