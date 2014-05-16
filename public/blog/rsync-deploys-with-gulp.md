[1]: http://gulpjs.com/ "Gulp"
[2]: https://github.com/jedrichards/rsyncwrapper "rsyncwrapper"
[3]: https://github.com/jedrichards/grunt-rsync "grunt-rsync"
[4]: http://gruntjs.com/ "Grunt"

I've been using [`grunt-rsync`][3] for deploying static builds to my servers via a quick [grunt][4] task. But I've recently switched to [Gulp][1] as my build system, and I wanted to also use a similar quick gulp task for deploying.

But at the moment there's no `gulp-rsync` module available. So how can I handle deploying without a gulp-specific rsync plugin?

## rsyncwrapper

Just use [`rsyncwrapper`][2] directly in the `gulpfile.js`. It's really quite easy.

Here's an example of how I'm handling it. See `rsyncwrapper`'s [documentation][2] for info on options.

~~~.language-javascript
// gulpfile.js
var rsync = require('rsyncwrapper').rsync;
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('deploy', function() {
  rsync({
    ssh: true,
    src: './build/',
    dest: 'user@hostname:/path/to/www',
    recursive: true,
    syncDest: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
      gutil.log(stdout);
  });
});
~~~

## Using a secrets file to store credentials

I typically use a `secrets.json` or `secrets.yml` file to store credentials, hostnames, paths, and the like for deployments.

Here's a quick example:

~~~.language-javascript
// secrets.json
{
  "servers": {
    "dev": {
      "rsyncDest": "user@hostname:/path/to/www"
    }
  }
}
~~~

Then just `require()` `secrets.json` in `gulpfile.js` and reference it in the deploy task.

~~~.language-javascript
// gulpfile.js
var secrets = require('./secrets.json');

// ...
src: './build/',
dest: secrets.servers.dev.rsyncDest,
// ...
~~~

Again, pretty easy.

## Multiple deploy targets

I haven't yet figured out how to handle multiple targets, mostly because I haven't had to deploy to different servers quite yet, but that'll be coming up soon, I'm sure.
