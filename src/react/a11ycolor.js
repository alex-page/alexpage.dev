import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const A11yColor = () => (
	<Fragment>
		<div className="a11ycolor">
			<p><input type="text" value="#fff"/> on <input type="text" value="#000"/></p>
			<div className="palette__container">
				<div className="palette">Hello Helen my old friend</div>
				<div className="palette palette--reverse">Potato cabbage till the end</div>
			</div>
		</div>
	</Fragment>
);


export default A11yColor;
