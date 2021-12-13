const cleanCSS = require("clean-css");

module.exports = (eleventyConfig) => {
  eleventyConfig.addNunjucksShortcode(
    "cssBundle",
    () => new cleanCSS({}).minify(["src/_includes/style.css"]).styles
  );

  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: { input: "src" },
  };
};
