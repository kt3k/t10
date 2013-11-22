
module.exports = (grunt) ->

    grunt.initConfig

        jshint:
            src: 'src/**/*.js'
            test: 'test/**/*.js'
            options:
                jshintrc: '.jshintrc'

        jasmine:
            src: 'src/**/*.js'
            options:
                helpers: ['bower_components/sinon-1.7.3.js/index.js']
                specs: 'test/**/*.js'
                keepRunner: true

    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-jasmine'

    grunt.registerTask 'default', ['jshint', 'jasmine']
