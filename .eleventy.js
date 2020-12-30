const MinifyCss           = require('clean-css');
const Yaml                = require('js-yaml');
const SyntaxHighlight     = require('@11ty/eleventy-plugin-syntaxhighlight');
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const PrettyNumber        = require('number-abbreviate');
const htmlmin             = require("html-minifier");

const fs = require('fs');

module.exports = eleventyConfig => {
	eleventyConfig.addNunjucksShortcode('cssBundle', () => new MinifyCss({}).minify(['src/_includes/css/_base.css']).styles);

	eleventyConfig.addPlugin(SyntaxHighlight);
	eleventyConfig.addPlugin(inclusiveLangPlugin);

	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy('src/CNAME');
	eleventyConfig.addPassthroughCopy("src/blog/**/*.png");
	eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");

	eleventyConfig.addFilter('prettyNumber', number => PrettyNumber(number));
	eleventyConfig.addDataExtension('yaml', contents => Yaml.safeLoad(contents));

	eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
		if( outputPath && outputPath.endsWith(".html") ) {
			let minified = htmlmin.minify(content, {
				minifyCSS: true,
				minifyJS: true,
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}

		return content;
	});

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
			input: 'src',
			includes: '_includes'
		}
	};
};
