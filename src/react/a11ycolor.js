import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const A11yColor = () => (
	<Fragment>
		<div className="a11ycolor">
			<div className="palette__container">
				<div className="palette">
					<p className="result">Passes AA with a color contrast ratio of 21</p>
					<p className="palette__test">Hello Helen my old friend</p>
				</div>
				<div className="palette">
					<p className="result">Passes AA with a color contrast ratio of 21</p>
					<p className="palette__test">Hello Helen my old friend</p>
				</div>
				<div className="palette">
					<p className="result">Passes AA with a color contrast ratio of 21</p>
					<p className="palette__test">Hello Helen my old friend</p>
				</div>
			</div>
		</div>
	</Fragment>
);


export default A11yColor;
