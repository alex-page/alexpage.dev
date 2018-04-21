import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

/**
 * The page layout component
 */
const Header = ({ profile_pic, social_menu, logo_pic, _body, _relativeURL, _ID }) => (
	<header>
		<div className="header__top">
			<div className="header__top__left">
				<a className="header__home" href="/">
					<img className="header__logo au-responsive-media-img" alt="Alex Page logo" src={ _relativeURL( logo_pic, _ID ) } />
				</a>
			</div>
			<div className="header__top__right">
				{ social_menu }
			</div>
		</div>
	</header>
);

Header.propTypes = {


	social_menu: PropTypes.object.isRequired,


	logo_pic: PropTypes.string.isRequired,
};

Header.defaultProps = {};

export default Header;
