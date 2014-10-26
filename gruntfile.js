module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';\n',
                stripBanners: true
            },
            dist: {
                src: [
                    './dev/components/jquery/jquery.js'
                    , './dev/components/handlebars/handlebars.js'
                    , './dev/js/modal.js'
                    , './dev/js/product.js'
                    , './dev/js/products_collection.js'
                    , './dev/js/basket.js'
                    , './dev/js/main.js'
                ],
                dest: './public/js/main.js'
            }
        },

        uglify: {
            dist: {
                src: './public/js/main.js',
                dest: './public/js/main.min.js'
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
                , noAdvanced: true
            },
            dist: {
                src: [
                    './dev/components/bootstrap/dist/css/bootstrap.css'
                    , './dev/css/main.css'
                    , './dev/css/header.css'
                    , './dev/css/content.css'
                    , './dev/css/footer.css'
                    , './dev/css/header_media.css'
                    , './dev/css/content_media.css'
                    , './dev/css/footer_media.css'
                ],
                dest: './public/css/main.min.css'
            }
        },

        copy: {
            imgs: {
                flatten: true,
                filter: 'isFile',
                expand: true,
                cwd: './dev/images/',
                src: '**',
                dest: './public/css/images/'
            },
            fonts: {
                flatten: true,
                filter: 'isFile',
                expand: true,
                cwd: './dev/fonts/',
                src: '**',
                dest: './public/fonts/'
            },
            bootstrap_fonts: {
                flatten: true,
                filter: 'isFile',
                expand: true,
                cwd: './dev/components/bootstrap/dist/fonts/',
                src: '**',
                dest: './public/fonts/'
            }
        },

        imagemin: {
            css: {
                files: [{
                    expand: true,
                    cwd: './dev/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: './public/css/images/'
                }]
            }
        },

        uncss: {
            dist: {
                files: {
                    './public/css/main.min.css': ['./public/index.html']
                }
            }
        },

        imageEmbed: {
            dist: {
                src: ['./public/css/main.min.css'],
                dest: './public/css/style.min.css'
            },
            options: {
                deleteAfterEncoding: true
            }
        },

        watch: {
            scripts: {
                files: './dev/js/*.js',
                tasks: ['concat', 'uglify']
            },
            styles: {
                files: './dev/css/*.css',
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['concat', 'uglify', 'cssmin', 'copy', 'watch']);
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'copy', 'uncss', 'imagemin', 'imageEmbed']);
}