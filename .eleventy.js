const MarkdownIt = require("markdown-it")();
const MinifyCss  = require( 'clean-css' );
const MinifyJS   = require( 'uglify-js' );


// Copy the default image renderer
const defaultImageRenderer = MarkdownIt.renderer.rules.image;

// Change the renderer for images that are links to youtube videos
// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
MarkdownIt.renderer.rules.image = function (tokens, idx, options, env, self) {
	const token    = tokens[idx];
	const srcIndex = token.attrIndex( 'src' );
	const src      = token.attrs[srcIndex][1];

	// If the src is to a youtube video
	if ( src.includes( 'youtube.com/watch?' ) ) {

		// Get the alt text
		const alt = token.content;

		// Get the video ID from the src
		let videoId = src.split( 'v=' )[1];
		if( videoId.indexOf( '&' ) != -1 ) {
			videoId = videoId.substring(0, ampersandPosition);
		}

		// Return an embedded video
		return `<div class="embed-responsive"><iframe title="${ alt }" src="https://www.youtube.com/embed/${ videoId }" frameborder="0" allowfullscreen></iframe></div>`;
	}

	// Return the default
	return defaultImageRenderer(tokens, idx, options, env, self);
};

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

	// Adjust default browserSync config
	eleventyConfig.setBrowserSyncConfig({
		open: 'local'
	});

	// Apply the custom renderer
	eleventyConfig.setLibrary( 'md', MarkdownIt );

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
