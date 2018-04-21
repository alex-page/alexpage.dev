import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

/**
 * The page layout component
 */
const Header = ({ logo_pic, npm, documentation, _body, _relativeURL, _ID }) => (
	<header className="header__npm">
		<div className="header__top">
			<div className="header__top__left">
				<a className="header__home" href="/">
					<img className="header__logo au-responsive-media-img" alt="Alex Page logo" src={ _relativeURL( logo_pic, _ID ) } />
				</a>
				<code>npm i { npm } --save</code>
			</div>
			<div className="header__top__right">
				<a href={ documentation }>Documentation</a>
			</div>
		</div>
		<div className="header__body">
			{ _body }
		</div>
	</header>
);

Header.propTypes = {


	logo_pic: PropTypes.string.isRequired,
};

Header.defaultProps = {};

export default Header;
