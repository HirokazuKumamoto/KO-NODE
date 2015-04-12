'use strict';

exports.description = 'Create a Web Project, including Knockout and Node.js.';

exports.template = function(grunt, init, done) {

  init.process({type: 'jquery'}, [
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('author')
  ], function(err, props) {
    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});
    done();
  });
};
