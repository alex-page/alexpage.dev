var a11yinputs = document.querySelectorAll( '.palette__inputs input' );

function ResizeInput( inputs ){
	for( var i = 0; i < inputs.length; i++ ){
		var value = inputs[ i ].value;
		var inputStyles = window.getComputedStyle( inputs[ i ] );

		var inputFontSize = inputStyles.getPropertyValue( 'font-size' );
		var inputFontFamily = inputStyles.getPropertyValue( 'font-family' );

		var tempSpan = document.createElement( 'span' );
		tempSpan.textContent = value;
		tempSpan.style.fontSize = inputFontSize;
		tempSpan.style.fontFamily = inputFontFamily;

		document.body.insertBefore( inputs[ i ], tempSpan );

		console.log( tempSpan.offsetWidth );

		inputs[ i ].style.width = valueLength * inputFontSize + 'px';
	}
}

ResizeInput( a11yinputs );
