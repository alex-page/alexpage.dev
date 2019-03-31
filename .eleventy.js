const MinifyCss  = require( 'clean-css' );
const MinifyJS   = require( 'uglify-js' );
const Fs         = require( 'fs' );

module.exports = ( eleventyConfig ) => {
	/**
	 * cssmin - Minify CSS filter
	 */
	eleventyConfig.addFilter( 'cssmin', ( code ) => {
		const minified = new MinifyCss({}).minify( code ).styles;
		return minified;
	});

	/**
	 * jsmin - Minify JS filter
	 */
	eleventyConfig.addFilter( 'jsmin', ( code ) => {
		const minified = MinifyJS.minify( code, {
			mangle: true,
			compress: true,
		});

		if( minified.error ) {
			console.log( 'UglifyJS error: ', minified.error );
			return code;
		}

		return minified.code;
	});

	/**
	 * Get parent page slug
	 */
	eleventyConfig.addFilter( "parentslug", ( value ) => {
		const urlSplit = value.split( '/' );
		if( urlSplit.length <= 3 ){
			return;
		}

		return `${ urlSplit[ 1 ]}`;
	});

	// Adjust default browserSync config
	eleventyConfig.setBrowserSyncConfig({
		open: 'local',
		callbacks: {
			ready: function(err, bs) {
				const content_404 = Fs.readFileSync( 'site/404.html' );

				bs.addMiddleware("*", (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			}
		}
	});

	// The configuration object ( optional )
	return {
		dir: {
			input: 'src',
			includes: '_includes',
			output: 'site'
		},
		templateFormats : ['njk', 'md'],
		htmlTemplateEngine : false,
		markdownTemplateEngine: 'njk',
	};
};
