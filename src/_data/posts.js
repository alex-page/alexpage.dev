const cache = require('@11ty/eleventy-cache-assets');
const globby = require('globby');
const matter = require('gray-matter');
const fs = require('fs');

/**
 * Read the markdown file and return the value of the key
 *
 * @param {string} directory -  The directory of the files
 * @param {string} frontMatterKey - The key to return the value
 */
const getFrontMatter = async (directory, frontMatterKey) => {
	const projectFiles = await globby([directory]);

	return projectFiles
		.map(file => {
			const fileContents = fs.readFileSync(file);
			const {data} = matter(fileContents);
			return {
				url: file.replace('src', '').replace('.md', ''),
				...data
			};
		});
};

module.exports = async () => {
	const posts = await getFrontMatter('src/posts/*.md');

	posts.forEach(post => {
		const isGitHubRepo = post.github;
		const isNpmPackage = post.npm;
		const isTalk = post.tags.includes('talks');

		console.log(isGitHubRepo, isNpmPackage, isTalk);
	});

	// const repoStars = {};
	// repoData.forEach(githubRepo => {
	// 	repoStars[githubRepo.full_name] = githubRepo.stargazers_count;
	// });

	// const packageDownloads = {};
	// packageData.forEach(npmPackage => {
	// 	packageDownloads[npmPackage.package] = npmPackage.downloads;
	// });

	return {};
};
