// gruntfile.js
//Useful starting point https://24ways.org/2013/grunt-is-not-weird-and-hard/
// Run PagespeedInsights
//https://github.com/addyosmani/critical#options
// RESOURCES: related to critical - https://github.com/bezoerb/grunt-critical; https://github.com/addyosmani/critical

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // remove old files from css and js folders
    clean: {
    clean: ['dist/css/*.css', 'dist/js/*.js','dist/img/*',
    //cleaning all views files can be done with dynamic syntax also.
    'dist/views/css/*.css', 'dist/views/js/*.js','dist/views/images/*'],
     },

    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.js',
          dest:'dist/'
        }],
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.css', '!*.min.css'],
          dest: 'dist/'
        }]
      }
    },

    imagemin: {
        imgall: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: '**/*.{png,jpg}',
            dest: 'dist/'
          }]
        }
    },


  qunit: {
    files: ['test/**/*.html']
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },

    critical: {
          options: {
            base: './',
            css: [
              'src/css/style.css',
              'src/css/print.css'
                ],
                width: 420,
                height: 400
            },
                src: 'index.html',
                dest: 'index-critical.html'
          },
//    copy: {
  //    main:{
    //    expand: true,
      //  src:'src/src/views/pizza.html',
        //dest: "dist/views/"
      //},
    //},
});





  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-critical');


  grunt.registerTask('step1', ['clean', 'jshint']);
  grunt.registerTask('step2', ['critical']);
  grunt.registerTask('step3', ['uglify', 'cssmin', 'imagemin']);

};