import PropTypes from 'prop-types';
import React from 'react';

/**
 * The page layout component
 */
const SocialMenu = ({ items, logo_pic, _relativeURL, _ID }) => (
	<footer className="presenation__footer">
		<ul className="social-menu">
			{
				items.map( ( item, key ) => (
					<li key={ key }>
						<a className={ 'icon icon--' + item.icon } href={ item.link }>{ item.text }</a>
					</li>
				))
			}
		</ul>
		<a className="footer__logo" href="/">
			<img alt="Alex Page logo" src={ _relativeURL( logo_pic, _ID ) } />
		</a>
	</footer>
);

SocialMenu.propTypes = {
	items: PropTypes.array.isRequired,
};

SocialMenu.defaultProps = {};

export default SocialMenu;
