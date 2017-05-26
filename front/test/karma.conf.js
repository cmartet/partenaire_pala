// karma.conf.ts
module.exports = (config) => {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine', 'webpack'],
        files: [
            'build/js/**/*.js',
            'build/tests/**/test_*.js'
        ],
        port: 9876,
        autoWatch: true,
        browsers: ['Chrome']
    });
}