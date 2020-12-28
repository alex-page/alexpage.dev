const generateSVG = (
	iterations = 5,
	strokeColor = 'var(--color-text)'
) => {
	const polygons = new Array(iterations).map(polygonColumn => {
		console.log(polygonColumn);
		return '<text>yo</text>';
	});

	return `<svg xmlns="http://www.w3.org/2000/svg">
		<g fill="none" stroke="${strokeColor}">${polygons}</g>
	</svg>`;
};

module.exports = () => ({
	svg: generateSVG(1)
});

/*
<svg width="300px" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
	<g fill="none" stroke="#fff">
		<polygon points="100, 100 100, 80 80,  100 100, 100" />
		<polygon points="200, 100 200, 60 180, 100 200, 100" />
		<polygon points="300, 100 300, 40 280, 100 300, 100" />
		<polygon points="400, 100 400, 20 380, 100 400, 100" />
		<polygon points="500, 100 500, 0 480,  100 500, 100" />

		<polygon points="100, 200 100, 180 60,  200 100, 200" />
		<polygon points="200, 200 200, 160 160, 200 200, 200" />
		<polygon points="300, 200 300, 140 260, 200 300, 200" />
		<polygon points="400, 200 400, 120 360, 200 400, 200" />
		<polygon points="500, 200 500, 100 460, 200 500, 200" />

		<polygon points="100, 300 100, 280 40,  300 100, 300" />
		<polygon points="200, 300 200, 260 140, 300 200, 300" />
		<polygon points="300, 300 300, 240 240, 300 300, 300" />
		<polygon points="400, 300 400, 220 340, 300 400, 300" />
		<polygon points="500, 300 500, 200 440, 300 500, 300" />

		<polygon points="100, 400 100, 380 20,  400 100, 400" />
		<polygon points="200, 400 200, 360 120, 400 200, 400" />
		<polygon points="300, 400 300, 340 220, 400 300, 400" />
		<polygon points="400, 400 400, 320 320, 400 400, 400" />
		<polygon points="500, 400 500, 300 420, 400 500, 400" />

		<polygon points="100, 500 100, 480 0,   500 100, 500" />
		<polygon points="200, 500 200, 460 100, 500 200, 500" />
		<polygon points="300, 500 300, 440 200, 500 300, 500" />
		<polygon points="400, 500 400, 420 300, 500 400, 500" />
		<polygon points="500, 500 500, 400 400, 500 500, 500" />
	</g>
</svg>
*/
