'use strict';

module.exports = function (grunt) {
    // Load grunt all tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long the tasks take.
    require('time-grunt')(grunt);

    grunt.initConfig({
        watch: {
            nodeModule: {
                files: ['app/**/*.js'],
                tasks: ['newer:jshint:all', 'jasmine_node']
            },
            jasmineTest: {
                files: ['app/**/*.spec.js'],
                tasks: ['newer:jshint:test', 'jasmine_node']
            }
        },
        jshint: {
            options: {
                jshintrc: 'app/.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                '!app/**/node_modules/**/*.js'
            ],
            test: {
                options: {
                    jshintrc: 'app/.jshintrc'
                },
                src: ['app/**/*.spec.js']
            }
        },
        jasmine_node: { // jshint ignore:line
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                jUnit: {
                    report: true,
                    savePath: "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['app/']
        }
    });
    grunt.registerTask('default', [
        'newer:jshint',
        'jasmine_node'
    ]);
};
