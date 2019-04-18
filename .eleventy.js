const MinifyCss  = require( 'clean-css' );
const MinifyJS   = require( 'uglify-js' );
const Got        = require( 'got' );
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

	/**
	 * Get the npm package downloads
	 */
	eleventyConfig.addNunjucksAsyncFilter( "packageDownloads", async( packageName, callback ) => {
		try {
			const url = `https://api.npmjs.org/downloads/point/last-week/${ packageName }`;
			const { body } = await Got( url );
			const downloads = JSON.parse( body ).downloads;
			callback( null, downloads );
		}
		catch( error ){
			callback( error );
		}
	});

	/**
	 * Get the GitHub stars
	 */
	eleventyConfig.addNunjucksAsyncFilter( "githubStars", async( repoName, callback ) => {
		try {
			const url = `https://api.github.com/repos/${ repoName }`;
			const { body } = await Got( url );
			const totalStars = JSON.parse( body ).stargazers_count;
			callback( null, totalStars );
		}
		catch( error ){
			callback( error );
		}
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
