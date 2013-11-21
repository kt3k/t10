
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
                specs: 'test/**/*.js'

    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-jasmine'

    grunt.registerTask 'default', ['jshint', 'jasmine']
