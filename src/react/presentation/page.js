import PropTypes from 'prop-types';
import React from 'react';


/**
 * The page layout component
 */
const Page = ({ pagetitle, stylesheet, header, footer, slides, script, _relativeURL, _ID }) => {
	const headContent = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
<link rel="manifest" href="/assets/favicons/site.webmanifest">
<link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#06262d">
<link rel="shortcut icon" href="/assets/favicons/favicon.ico">
<meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
<meta name="msapplication-TileColor" content="#24292e">
<meta name="theme-color" content="#24292e">
<meta name="robots" content="index, follow">
<meta name="author" content="Alex Page">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Alex Page">
<meta name="twitter:description" content="Modern technology and thoughtful design - Alex Page">
<meta name="twitter:name" content="Alex Page">
<meta name="twitter:image" content="http://alexpage.com.au/assets/favicons/alex-page.jpg">
<meta property="og:type" content="website">
<meta property="og:title" content="Alex Page">
<meta property="og:site_name" content="Alex Page">
<meta property="og:description" content="Modern technology and thoughtful design - Alex Page">
<meta name="Description" content="I am a developer specialising in design systems, JavaScript, open-source and accessibility. I love solving problems at scale with systemisation, automation, modern technology and thoughtful design.">
<meta property="og:image" content="http://alexpage.com.au/assets/favicons/alex-page.jpg">
<meta property="og:url" content="http://alexpage.com.au">
<title>Alex Page - ${ pagetitle }</title>
<link rel="stylesheet" href=${ _relativeURL( '/assets/css/style.css', _ID ) }>
<!--[if lte IE 9]>
	<script src="${ _relativeURL( '/assets/js/html5shiv.js', _ID ) }"></script>
	<script src="${ _relativeURL( '/assets/js/respond.js', _ID ) }"></script>
<![endif]-->
<script src=${ _relativeURL( '/assets/js/header.js', _ID ) }></script>`;

	return (
	<html>
	<head dangerouslySetInnerHTML={{ __html: headContent }} />
	<body className="au-body au-body--dark au-grid presenation-page">
		<main id="presentation" className="presenation">{ slides }</main>
		{ footer }
		<script src={ _relativeURL( '/assets/js/prism.js', _ID ) } />
		<script src={ _relativeURL( '/assets/js/bespoke.js', _ID ) }></script>
	</body>
	</html>
)};

Page.propTypes = {
/**
	 * title: Homepage
	 */
	pagetitle: PropTypes.string.isRequired,

	/**
	 * body: (partials)(5)
	 */
	slides: PropTypes.node.isRequired,
};

Page.defaultProps = {};

export default Page;
