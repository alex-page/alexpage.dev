const cache = require('@11ty/eleventy-cache-assets');
const globby = require('globby');
const matter = require('gray-matter');
const fs = require('fs');

const pages = 'src/projects/*/index.md';
const githubApi = 'https://api.github.com/repos/';
const npmApi = 'https://api.npmjs.org/downloads/point/last-year/';

/**
 * Read the markdown file and return the value of the key
 *
 * @param {string} directory -  The directory of the files
 * @param {string} frontMatterKey - The key to return the value
 */
const getFrontMatter = async (directory, frontMatterKey) => {
	const projectFiles = await globby([directory]);

	return projectFiles
		.map(file => fs.readFileSync(file))
		.map(content => {
			const {data} = matter(content);
			return data[frontMatterKey];
		})
		.filter(key => key);
};

module.exports = async () => {
	const githubRepos = await getFrontMatter(pages, 'github');
	const npmPackages = await getFrontMatter(pages, 'npm');

	// Fetch Github and NPM to get data
	const repoData = await Promise.all(
		githubRepos.map(repo =>
			cache(`${githubApi}${repo}`, {type: 'json'})
		)
	);

	const packageData = await Promise.all(
		npmPackages.map(npmPackage =>
			cache(`${npmApi}${npmPackage}`, {type: 'json'})
		)
	);

	const repoStars = repoData.map(githubRepo => ({
		[githubRepo.full_name]: githubRepo.stargazers_count
	}));

	const packageDownloads = packageData.map(npmPackage => ({
		[npmPackage.package]: npmPackage.downloads
	}));

	return {
		stars: repoStars,
		downloads: packageDownloads
	};
};
