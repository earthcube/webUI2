<?php

echo '<!DOCTYPE html>
<html lang="en">
<head>
<title>Geodex.org</title>
<link rel="stylesheet" href="css/geodex.css" type="text/css" />
<link rel="stylesheet" href="js/jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="css/leaflet.css" type="text/css" />
<script type="text/javascript" src="js/geodex/geodexcore.js"></script>
<script type="text/javascript" src="js/geodex/geodextextsearch.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="js/jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="js/jqwidgets/jqxinput.js"></script>';

echo '$(document).ready(function () {
		createComponents();
});
</script>
</head>
<body class=\'default\' onload="initialize()">
<div id=\'main\'>';
include("components/textSearch.html");
echo '</div></body></html>';

?>