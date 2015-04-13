'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
      }
    },
    ts: {
      options: {
        target: 'es5',
        module: 'commonjs',
        sourceMap: false,
        preserveConstEnums: false,
        compiler: './node_modules/grunt-ts/node_modules/typescript/bin/tsc'
      },
      default: {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"]
      },
      app: {
        src: ["**/app.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"]
      },
      script: {
        src: ["**/*.ts", "!**/app.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"]
      },
    },
    clean: {
      files: ['public/dist']
    },
    concat: {
      js: {
        src: ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/knockout/dist/knockout.js'],
        dest: 'public/src/assets/js/script-lib.js'
      },
      css: {
        src: ['bower_components/bootstrap/dist/fonts/bootstrap.css', 'bower_components/bootstrap/dist/css/bootstrap-theme.css'],
        dest: 'public/src/assets/css/style-lib.css'
      },
    },
    cssmin: {
      csslib: {
        files: {
          'public/dist/assets/css/style-lib.css': ['public/dist/assets/css/style-lib.css']
        }
      },
      css: {
        files: {
          'public/dist/assets/css/style.css': ['public/dist/assets/css/style.css']
        }
      }
    },
    uglify: {
      jslib: {
        src: '<%= concat.js.dest %>',
        dest: 'public/dist/assets/js/script-lib.js'
      },
      js: {
        src: 'public/src/assets/js/script.js',
        dest: 'public/dist/assets/js/script.js'
      },
    },
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/fonts/',
          src: ['**'],
          dest: 'public/src/assets/fonts/'
        }]
      },
      cssmap: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/css/',
          src: ['**.map'],
          dest: 'public/src/assets/css/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'public/src/',
          src: ['**'],
          dest: 'public/dist/'
        }]
      },
    },
    watch: {
      app: {
        files: 'app.ts',
        tasks: ['ts:app']
      },
      script: {
        files: 'public/src/assets/js/*.ts',
        tasks: ['ts:script']
      },
    },
  });
    
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['ts:app', 'ts:script']);
  grunt.registerTask('resolve', ['bower:install', 'concat:js', 'concat:css', 'copy:fonts', 'copy:cssmap', 'ts:default']);
  grunt.registerTask('build', ['jshint', 'clean', 'copy:dist', 'uglify', 'cssmin']);
};
