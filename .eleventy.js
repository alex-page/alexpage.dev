const cleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

module.exports = (eleventyConfig) => {
  eleventyConfig.addNunjucksShortcode(
    "cssBundle",
    () => new cleanCSS({}).minify(["src/_includes/style.css"]).styles
  );

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

  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: { input: "src" },
  };
};
