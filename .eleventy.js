const MinifyCss = require( 'clean-css' );
const MinifyJS = require( 'uglify-js' );


module.exports = ( eleventyConfig ) => {

	/**
	 * cssmin - Minify CSS filter
	 */
	eleventyConfig.addFilter( "cssmin", ( code ) => {
		const minified = new MinifyCss({}).minify( code ).styles;
		return minified;
	});

	/**
	 * jsmin - Minify JS filter
	 */
	eleventyConfig.addFilter( "jsmin", ( code ) => {
		const minified = MinifyJS.minify( code );
		if( minified.error ) {
			console.log( "UglifyJS error: ", minified.error );
			return code;
		}

		return minified.code;
	});

	eleventyConfig.setBrowserSyncConfig({
		open: 'local'
	});


	// You can return your Config object (optional).
	return {
		dir: {
			input: "src",
			includes: "_includes",
			output: "site"
		},
		templateFormats : ["njk", "md"],
		htmlTemplateEngine : "njk",
		markdownTemplateEngine : "njk",
	};
};
