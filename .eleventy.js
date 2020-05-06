// Dependencies
const PrettyNumber     = require( 'number-abbreviate' );
const MinifyCss        = require( 'clean-css' );
const syntaxHighlight  = require("@11ty/eleventy-plugin-syntaxhighlight");

// Local dependencies
const fs = require( 'fs' );

module.exports = ( eleventyConfig ) => {
	/**
	 * cssmin - Minify CSS filter
	 */
	eleventyConfig.addFilter( 'cssmin', ( code ) => {
		const minified = new MinifyCss({}).minify( code ).styles;
		return minified;
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

	/**
	 * Add syntax highlighting on the server side
	 */
	eleventyConfig.addPlugin(syntaxHighlight);

	/**
	 * Copy everything in the assets directory to the built site
	 */
	eleventyConfig.addPassthroughCopy({"src/_assets": "assets"});
	eleventyConfig.addPassthroughCopy("src/CNAME");

	// Adjust default browserSync config
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function( error, browserSync ) {
				browserSync.addMiddleware("*", (request, response) => {
					const content_404 = fs.readFileSync('_site/404.html');
					response.write(content_404);
					response.writeHead(404);
					response.end();
				});
			}
		}
	});

	// The configuration object ( optional )
	return {
		dir: {
			input: 'src',
			includes: '_includes'
		},
		templateFormats : ['njk', 'md'],
		htmlTemplateEngine : 'njk',
		markdownTemplateEngine: 'njk',
	};
};
