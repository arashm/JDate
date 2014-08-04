'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/*.js']
      },
      test: {
        src: ['test/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      test: {
        files: [
          'lib/*.js',
          'test/*.js',
          'test/fixtures/*.css',
          'test/expected/*.css'
        ],
        tasks: ['jshint:lib', 'nodeunit']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
