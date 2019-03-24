const GitLastCommit = require( "git-last-commit" );

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

module.exports = GetLastCommit;
