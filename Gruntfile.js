'use strict'

module.exports = function(grunt) {

    require('time-grunt')(grunt);


    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
      });

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss', 
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/.css*',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true, 
                    server: {
                            baseDir: './'
                        }
                }
            }
        },
        copy: {
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]                
            },
        },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            },
            clean: {
                build: {
                    src: [ 'dist/']
                }
            },
            imagemin: {
                dynamic: {
                    files: [{
                        expand: true,                  // Enable dynamic expansion
                        cwd: './',                   // Src matches are relative to this path
                        src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                        dest: 'dist/'                  // Destination path prefix
                    }]
                }
            },

            useminPrepare: {
                foo: {
                    dest: 'dist',
                    src: ['contactus.html','aboutus.html','index.html']
                },
                options: {
                    flow: {
                        steps: {
                            css: ['cssmin'],
                            js:['uglify']
                        },
                        post: {
                            css: [{
                                name: 'cssmin',
                                createConfig: function (context, block) {
                                var generated = context.options.generated;
                                    generated.options = {
                                        keepSpecialComments: 0, rebase: false
                                    };
                                }       
                            }]
                        }
                    }
                }
            },

             // Concat
        concat: {
            options: {
                separator: ';'
            },
  
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
  
            release: {
            // filerev:release hashes(md5) all assets (images, js and css )
            // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
  
        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        },

        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
                }
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};

/*
npm install -g grunt-cli@1.2.0
npm install grunt@1.0.2 --save-dev
npm install grunt-sass@2.1.0 --save-dev
npm install time-grunt@1.4.0 --save-dev
npm install jit-grunt@0.10.0 --save-dev
npm install grunt-contrib-watch@1.0.0 --save-dev
npm install grunt-browser-sync@2.2.0 --save-dev
*/


//grunt css
//grunt
//npm install grunt-contrib-copy@1.0.0 --save-dev
//npm install grunt-contrib-clean@1.1.0 --save-dev
//npm install grunt-contrib-imagemin@2.0.1 --save-dev
/*
 npm install grunt-contrib-concat@1.0.1 --save-dev
 npm install grunt-contrib-cssmin@2.2.1 --save-dev
 npm install grunt-contrib-htmlmin@2.4.0 --save-dev
 npm install grunt-contrib-uglify@3.3.0 --save-dev
 npm install grunt-filerev@2.3.1 --save-dev
 npm install grunt-usemin@3.1.1 --save-dev
 */
//grunt build