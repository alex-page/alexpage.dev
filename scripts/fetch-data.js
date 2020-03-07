// NPM packages
const got = require('got');
const matter = require('gray-matter');
const globby = require('globby');

// Local dependencies
const fs = require('fs');

// Settings
const SETTINGS = {
	dataDir: 'src/_data/',
	dataFile: 'data.json',
	projects: 'src/projects/*/index.md',
	githubApi: 'https://api.github.com/repos/',
	npmApi: 'https://api.npmjs.org/downloads/point/last-year/'
};

/**
 * Gets the value of a key from a url
 *
 * @param {string} url - The URL to fetch data from
 * @param {string} urlSuffix -  The suffix for the URL
 * @param {string} bodyKey - The key in the body to return
 */
const fetchKeyValue = async (url, urlSuffix, bodyKey) => {
	const response = await got(url + urlSuffix, {
		responseType: 'json',
		resolveBodyOnly: true
	});

	return {
		[urlSuffix]: response[bodyKey]
	};
};

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

// Fetch GitHub stars and NPM Downloads for the data.json file
(async () => {
	console.log('🎾 Fetching data');
	try {
		// Read the project markdown files and get the front matter
		const githubRepos = await getFrontMatter(SETTINGS.projects, 'github');
		const npmPackages = await getFrontMatter(SETTINGS.projects, 'npm');

		// Create the directory for the repos if it doesn't exist
		if (!fs.existsSync(SETTINGS.dataDir)) {
			fs.mkdirSync(SETTINGS.dataDir);
		}

		// Fetch Github and NPM to get data
		const stars = await Promise.all(
			githubRepos.map(repo => fetchKeyValue(SETTINGS.githubApi, repo, 'stargazers_count'))
		);
		const downloads = await Promise.all(
			npmPackages.map(npmPackage => fetchKeyValue(SETTINGS.npmApi, npmPackage, 'downloads'))
		);

		// Write the result to a file
		const result = JSON.stringify({stars, downloads}, null, 2);
		fs.writeFileSync(`${SETTINGS.dataDir}${SETTINGS.dataFile}`, result);

		console.log(`🤖 Generated ${SETTINGS.dataDir}${SETTINGS.dataFile}`);
	} catch (error) {
		console.error(error);
	}
})();

