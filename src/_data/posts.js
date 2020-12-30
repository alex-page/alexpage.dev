const cache = require('@11ty/eleventy-cache-assets');
const globby = require('globby');
const matter = require('gray-matter');
const fs = require('fs');

const githubApi = 'https://api.github.com/repos/';
const npmApi = 'https://api.npmjs.org/downloads/point/last-year/';

const fetchStars = async repo => {
	const data = await cache(`${githubApi}${repo}`, {type: 'json'});
	return data.stargazers_count;
};

const fetchDownloads = async npmPackage => {
	const data = await cache(`${npmApi}${npmPackage}`, {type: 'json'});
	return data.downloads;
};

const fetchData = async file => {
	const fileContents = fs.readFileSync(file);
	const {data, content} = matter(fileContents);

	const post = {
		content,
		...data,
		...data.permalink !== false && {url: file.replace('.md', '').replace('src', '')},
		...data.github && {stars: await fetchStars(data.github)},
		...data.npm && {downloads: await fetchDownloads(data.npm)}
	};

	return post;
};

module.exports = async () => {
	const projectFiles = await globby(['src/posts/*.md', 'src/blog/*.md']);
	const data = projectFiles.map(file => fetchData(file));
	const posts = await Promise.all(data);

	return posts;
};
