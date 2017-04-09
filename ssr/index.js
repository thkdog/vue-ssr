var bench = {
  _startTime: null,
  start() {
    this._startTime = new Date();
  },
  end() {
    var endTime = new Date();
    var span = endTime - this._startTime;
    console.log('\n... cost ' + span + 'ms');
  }
}

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const http = require('http');

bench.start();
const bundle = require('../dist-ssr/vue-ssr-bundle.json')
const renderer = createBundleRenderer(bundle, {
  template:
    '<!DOCTYPE html>' +
    '<html lang="en">' +
      '<head>' +
        '<meta charset="utf-8">' +
        // context.head will be injected here
        // context.styles will be injected here
      '</head>' +
      '<body>' +
        '<!--vue-ssr-outlet-->' + // <- app content rendered here
        // context.state will be injected here
      '</body>' +
    '</html>'
});

// var stream = renderer.renderToStream({ sampleProp: 'initial data' })
// stream.pipe(process.stdout)
// stream.on('end', function() {
//   bench.end();
// });

renderer.renderToString({ sampleProp: 'initial data' }, function(err, html) {
  console.log(html);
  bench.end();
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  renderer.renderToStream({ sampleProp: 'initial data' })
  .pipe(res);

}).listen(8080, '127.0.0.1');
