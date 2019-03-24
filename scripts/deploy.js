const GitHubPages = require( 'gh-pages' );

const siteDirectory = 'site';
const deployBranch = 'gh-pages';

GitHubPages.publish(
	siteDirectory,
	{
		branch: deployBranch,
		repo: `https://${ process.env.GITHUB_TOKEN }@github.com/alex-page/alex-page.git`,
		user: {
			name: 'Alex Page',
			email: 'alex@alexpage.com.au'
		},
		silent: true,
		dotfiles: true,
	},
	( error ) => {
		if( error ) {
			throw new Error( `❌ GitHub pages deployment failed: ${ siteDirectory } directory to ${ deployBranch } branch\n${ error }` );
		}
		console.log( `✅ GitHub pages deployment successfull: ${ siteDirectory } directory to ${ deployBranch } branch` );
	}
);

// https://twitter.com/aalexpaage/status/1109619279027015680
