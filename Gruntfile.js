module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    secrets: grunt.file.readYAML('secrets.yml'),
    rsync: {
      options: {
        args: ['--verbose'],
        exclude: ['.git'],
        recursive: true
      },
      prod: {
        options: {
          src: 'www/',
          host: '<%= secrets.rsync.prod.host %>',
          dest: '<%= secrets.rsync.prod.dest %>'
        }
      }
    }
  });

  grunt.registerTask('default', []);

  grunt.registerTask('deploy', ['rsync']);

}