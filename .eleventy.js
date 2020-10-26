// Dependencies
const PrettyNumber     = require('number-abbreviate');
const MinifyCss        = require('clean-css');
const syntaxHighlight  = require('@11ty/eleventy-plugin-syntaxhighlight');

// Local dependencies
const fs = require('fs');

module.exports = ( eleventyConfig ) => {
	eleventyConfig.addNunjucksShortcode('cssBundle', () => {
		return new MinifyCss({}).minify(['src/_includes/css/_base.css']).styles;
	})

	/**
	 * Get the parent page section
	 */
	eleventyConfig.addFilter('tagSection', ( tags ) => {
		let title = tags.filter( tag => tag !=='featured')
			.map( tag => tag[ tag.length - 1 ] ==='s' ? tag.slice(0, -1) : tag )
			.join(' ');
		return title;
	});

	eleventyConfig.addFilter('tagTitle', ( tags ) => {
		return tags.filter( tag => tag !=='featured').join(' ');
	});

	eleventyConfig.addFilter('prettyNumber', ( number ) => PrettyNumber( number ));

	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPassthroughCopy({'src/_assets':'assets'});
	eleventyConfig.addPassthroughCopy('src/CNAME');

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function(error, browserSync) {

				browserSync.addMiddleware('*', (request, response) => {
					const content_404 = fs.readFileSync('_site/404.html');
					response.write(content_404);
					response.writeHead(404);
					response.end();
				});
			}
		}
	});

	return {
		dir: {
			input:'src',
			includes:'_includes'
		},
		templateFormats : ['njk','md'],
		htmlTemplateEngine :'njk',
		markdownTemplateEngine:'njk',
	};
};
