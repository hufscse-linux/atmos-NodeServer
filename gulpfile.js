var gulp = require('gulp');
var bg = require('gulp-bg');
var gls = require('gulp-live-server');
var mkdirp = require('mkdirp');

gulp.task('mkdir-local-mongodb', function(){ mkdirp('tmp/mongo-data');})

gulp.task('run-local-mongodb', ['mkdir-local-mongodb'], bg("mongod", "--dbpath=" + __dirname + "/tmp/mongo-data"));

gulp.task('default', ['run-local-mongodb'], function() {
    var server = gls(
        'src/app.js',
        {
            env: {
                MONGODB_URI: "mongodb://localhost/atmos",
                PORT: 3000
            }
        }
    );
    setTimeout(function(){ server.start(); }, 1000);

    gulp.watch('src/app.js', function(){
        server.start.bind(server);
    });
});



