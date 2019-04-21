// Dependencies
const GitHubPages = require( "gh-pages" );
const GitLastCommit = new( require( "last-commit-log" ) )();


// Deploy the site
(async() => {
	const commitMessage = ( await GitLastCommit.getLastCommit() ).subject;
	const siteDirectory = "site";
	const deployBranch = "gh-pages";

	GitHubPages.publish(
		siteDirectory,
		{
			branch: deployBranch,
			repo: `https://${ process.env.GH_PAT }@github.com/alex-page/alex-page.git`,
			user: {
				name: "Alex Page",
				email: "alex@alexpage.com.au",
			},
			silent: true,
			dotfiles: true,
			message: commitMessage,
		},
		( error ) => {
			if( error ) {
				throw new Error( `❌ Failed to deploy to GitHub pages: ${ siteDirectory } directory failed to push to ${ deployBranch } branch\n${ error }` );
			}
			console.log( `✅ Successfully deployed to GitHub pages: ${ siteDirectory } directory pushed to ${ deployBranch } branch` );
		}
	);
})();
