const GitHubPages = require( 'gh-pages' );

GitHubPages.publish(
	'site',
	{
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
			throw new Error( `GitHub pages deploy failed: ${ error }` );
		}
		console.log( 'GitHub pages successfully deployed' );
	}
);
