// Dependencies
const GitHubPages = require( "gh-pages" );
const GitLastCommit = new( require( "last-commit-log" ) )();

const siteDirectory = "_site";
const deployBranch = "gh-pages";

// Deploy the site
(async() => {
	try {
		const {subject} =  await GitLastCommit.getLastCommit();

		await new Promise((resolve, reject) => GitHubPages.publish(
			siteDirectory,
			{
				branch: deployBranch,
				repo: `https://${ process.env.GH_PAT }@github.com/alex-page/alex-page.git`,
				user: {
					name: "Alex Page",
					email: "alex.page@shopify.com",
				},
				dotfiles: true,
				message: subject,
			},
			(error) =>  {
				if( error ){ reject( error ) }
				resolve();
			}
		));

		console.log( `✅ Successfully deployed to GitHub pages: ${ siteDirectory } directory pushed to ${ deployBranch } branch` );
	} catch(error){
		console.error( `❌ Failed to deploy to GitHub pages: ${ siteDirectory } directory failed to push to ${ deployBranch } branch\n${ error }` );
	}
})();
