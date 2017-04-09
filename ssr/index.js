const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const bundle = require('../dist-ssr/vue-ssr-bundle.json')
var http = require('http');

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
})

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  renderer.renderToStream({ sampleProp: 'initial data' })
  .pipe(res);

}).listen(8080, '127.0.0.1');
