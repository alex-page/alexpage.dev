import PropTypes from 'prop-types';
import React from 'react';

/**
 * The page layout component
 */
const SocialMenu = ({ items }) => (
	<ul className="social-menu social-menu--inline social-menu--hide-text">
		{
			items.map( ( item, key ) => (
				<li key={ key }>
					<a className={ 'icon icon--' + item.icon } href={ item.link }>{ item.text }</a>
				</li>
			))
		}
	</ul>
);

SocialMenu.propTypes = {
	items: PropTypes.array.isRequired,
};

SocialMenu.defaultProps = {};

export default SocialMenu;
