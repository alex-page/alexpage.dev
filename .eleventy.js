// Dependencies
const PrettyNumber     = require('number-abbreviate');
const MinifyCss        = require('clean-css');
const syntaxHighlight  = require('@11ty/eleventy-plugin-syntaxhighlight');

// Local dependencies
const fs = require('fs');

module.exports = ( eleventyConfig ) => {
	eleventyConfig.addNunjucksShortcode('cssBundle', () => {
		return new MinifyCss({}).minify(['src/_includes/css/_base.css']).styles;
	});

	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPassthroughCopy({'src/_assets':'assets'});
	eleventyConfig.addPassthroughCopy('src/CNAME');

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function(error, browserSync) {
				if(error){
					throw new Error(error);
				}

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
		}
	};
};
