// Dependencies
const PrettyNumber = require( 'number-abbreviate' );
const MinifyCss        = require( 'clean-css' );
const MinifyJS         = require( 'uglify-js' );

// Local dependencies
const Fs               = require( 'fs' );

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
	 * Get the parent page section
	 */
	eleventyConfig.addFilter( "tagSection", ( tags ) => {
		let title = tags.filter( tag => tag !== 'featured' )
			.map( tag => tag[ tag.length - 1 ] === 's' ? tag.slice(0, -1) : tag )
			.join( ' ' );
		return title;
	});

	/**
	 * Get the current listing group
	 */
	eleventyConfig.addFilter( "tagTitle", ( tags ) => {
		return tags.filter( tag => tag !== 'featured' ).join( ' ' );
	});

	/**
	 * Return number as k
	 */
	eleventyConfig.addFilter( "prettyNumber", ( number ) => {
		return PrettyNumber( number );
	});

	// Adjust default browserSync config
	eleventyConfig.setBrowserSyncConfig({
		open: 'local',
		callbacks: {
			ready: function( error, browserSync ) {
				if( error ){
					throw new Error( error );
				}

				// Provides the 404 content without redirect.
				const content_404 = Fs.readFileSync( 'site/404.html' );
				browserSync.addMiddleware("*", ( request, response ) => {
					response.write(content_404);
					response.end();
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
		markdownTemplateEngine: false,
	};
};
