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
		console.error( `GitHub pages deploy failed: ${ error }` );
	}
);
