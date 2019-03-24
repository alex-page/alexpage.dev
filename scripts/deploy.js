const GitHubPages = require( "gh-pages" );
const GitLastCommit = require( "git-last-commit" );

const siteDirectory = "site";
const deployBranch = "gh-pages";

const GetLastCommit = () => {
	return new Promise((resolve, reject) => {
		GitLastCommit.getLastCommit(function( error, commit ) {
			if( error ) {
				reject( error );
			}

			resolve( commit );
		})
	})
}


(async() => {
	GitHubPages.publish(
		siteDirectory,
		{
			branch: deployBranch,
			repo: `https://${ process.env.GITHUB_TOKEN }@github.com/alex-page/alex-page.git`,
			user: {
				name: "Alex Page",
				email: "alex@alexpage.com.au",
			},
			silent: true,
			dotfiles: true,
			message: await GetLastCommit().body,
		},
		( error ) => {
			if( error ) {
				throw new Error( `❌ Failed to deploy to GitHub pages: ${ siteDirectory } directory failed to push to ${ deployBranch } branch\n${ error }` );
			}
			console.log( `✅ Successfully deployed to GitHub pages: ${ siteDirectory } directory pushed to ${ deployBranch } branch` );
		}
	);
})()

