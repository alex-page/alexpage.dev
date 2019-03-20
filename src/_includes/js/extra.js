var harmonograph = document.getElementById( 'harmonograph' );

if ( harmonograph ) {
	function Round(e){return Math.round(1e3*e)/1e3}function GetViewbox(e){e.style.position="absolute",e.style.width="1px",e.style.height="1px",e.style.padding="0",e.style.margin="-1px",e.style.overflow="hidden",e.style.clip="rect(0,0,0,0)",e.style.border="0",document.body.appendChild(e);var t=e.getBBox();return e.removeAttribute("style"),e.remove(),t.x+" "+t.y+" "+t.width+" "+t.height}function HarmonographBezierPath(e){for(var t={x:[],y:[],cpX:[],cpY:[]},n=e.x.length,r=0;r<n;r+=50){t.x.push(Round(e.x[r])),t.y.push(Round(e.y[r]));var o=r<=0?0:r-1,u=n<=r?n-1:r+1,a=25/3*(e.x[u]-e.x[o]),d=25/3*(e.y[u]-e.y[o]);t.cpX.push(a),t.cpY.push(d)}var p=["M",t.x[0],t.y[0],"C",Round(t.x[0]+t.cpX[0]),Round(t.y[0]+t.cpY[0])+",",Round(t.x[1]-t.cpX[1]),Round(t.y[1]-t.cpY[1])+",",t.x[1],t.y[1]],i=t.x.length;if(2<i){p.push("S");for(r=2;r<i;r++)p.push(Round(t.x[r]-t.cpX[r])),p.push(Round(t.y[r]-t.cpY[r])+","),p.push(Round(t.x[r])),p.push(Round(t.y[r]))}return p.join(" ")}function GenerateHarmonograph(e,t,n){console.log(n);for(var r=0,o=0,u={x:[],y:[]};r<60*e;){r++;var a=n.map(function(e){return e.amplitude*Math.sin(e.frequency*o+e.phase)*Math.exp(-e.damping*o)}),d=a[0]+a[1],p=a[2]+a[3];u.x.push(d+t/2),u.y.push(p+t/2),o+=.01}return u}function Harmonograph(e){var t=e||{},n=t.size?t.size:700,r=t.strokeWidth?t.strokeWidth:1,o=t.strokeColor?t.strokeColor:"#000",u=HarmonographBezierPath(GenerateHarmonograph(t.pendulumTime?t.pendulumTime:150,n,t.pendulum = t.pendulum)),a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("xlms","http://www.w3.org/2000/svg");var d=document.createElementNS("http://www.w3.org/2000/svg","path");return d.setAttribute("d",u),d.setAttribute("stroke",o),d.setAttribute("stroke-width",r),d.setAttribute("fill","none"),a.appendChild(d),a.setAttribute("viewBox",GetViewbox(a)),a}

	var harmonographs = [ 
		[
			[ 1.994, 2.295, 0.002 ],
			[ 1.988, 2.559, 0.005 ],
			[ 2.005, 0.731, 0.006 ],
			[ 2.998, 3.110, 0.009 ],
		],
		[
			[ 1.998, 2.748, 0.005 ],
			[ 2.981, 2.169, 0.009 ],
			[ 2.002, 1.501, 0.001 ],
			[ 2.001, 0.194, 0.003 ],
		],
		[
			[ 2.980, 2.830, 0.0026 ],
			[ 2.0115, 0.3513, 0.00 ],
			[ 1.9944, 1.485, 0.008 ],
			[ 2.0033, 0.968, 0.009 ],
		],
		[
			[ 2.019, 1.323, 0.005 ],
			[ 2.0196, 2.076, 0.009 ],
			[ 3.0102, 0.1765, 0.0008 ],
			[ 1.997, 2.762, 0.008 ],
		],
		[
			[ 2.0097, 1.587, 0.002 ],
			[ 1.980, 2.676, 0.004 ],
			[ 3.0187, 1.274, 0.00042 ],
			[ 2.0126, 2.030, 0.002 ],
		],
		[
			[ 2.001, 2.066, 0.0026 ],
			[ 1.9986, 2.253, 0.007 ],
			[ 3.0085, 2.534, 0.008 ],
			[ 1.9875, 0.371, 0.0023 ],
		],
		[
			[ 1.988, 2.182, 0.006 ],
			[ 3.0034, 3.088, 0.00 ],
			[ 1.9877, 1.060, 0.008 ],
			[ 1.9946, 0.462, 0.003 ],
		],
		[
			[ 1.9974, 3.005, 0.007 ],
			[ 1.9847, 2.426, 0.006 ],
			[ 1.9992, 0.4556, 0.0014 ],
			[ 2.9967, 0.2437, 0.002 ],
		],
		[
			[ 3.0056, 1.717, 0.007 ],
			[ 3.0107, 1.163, 0.004 ],
			[ 3.019, 2.680, 0.008 ],
			[ 2.001, 0.613, 0.0045 ],
		],
		[
			[ 3.0146, 1.590, 0.006 ],
			[ 1.985, 0.717, 0.00 ],
			[ 2.008, 1.490, 0.005 ],
			[ 2.985, 2.367, 0.009 ],
		]
	];



	var randomHarmonograph = Math.floor( Math.random() * harmonographs.length );
	var generatedRandomHarmonograph = harmonographs[ randomHarmonograph ].map( function(values) {
		return {
			"amplitude": 200,
			"frequency": values[ 0 ],
			"phase": values[ 1 ],
			"damping": values[ 2 ],
		}
	});

	var element = Harmonograph({
		strokeColor: '#3DFCB3',
		pendulum: generatedRandomHarmonograph,
		pendulumTime: 250,
		size: 400,
		strokeWidth: 2,
	});

	harmonograph.appendChild( element );

	// Animate the svg path
	var svgPath = harmonograph.querySelector( 'path' );

	// Set up the path for animation
	var length = svgPath.getTotalLength();
	svgPath.style.strokeDasharray = length + ' ' + length;
	svgPath.style.strokeDashoffset = length;
	svgPath.style.transition = 'none';

	// Animate the path
	svgPath.getBoundingClientRect();
	svgPath.style.transition = 'stroke-dashoffset 45s linear';
	svgPath.style.strokeDashoffset = '0';
}
