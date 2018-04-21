import PropTypes from 'prop-types';
import React from 'react';

/**
 * The page layout component
 */
const Slide = ({ image, image_layout, align, _relativeURL, _ID, _body }) => (
	<div className={ `slide` +
		`${ align === 'left'            ? ' slide---align-left' : '' }` +
		`${ image_layout === 'featured' ? ' slide---image-featured' : '' }` +
		`${ image_layout === 'left'     ? ' slide---image-left' : '' }` +
		`${ image_layout === 'right'    ? ' slide---image-right' : '' }`
	}>
		<div className="slide__body">
			{ _body }
		</div>
		{
			image
				?
					<div className={ `slide__image` }>
						<img src={ _relativeURL( image, _ID ) } />
					</div>
				: ''
		}
	</div>
);

Slide.propTypes = {};

Slide.defaultProps = {};

export default Slide;
