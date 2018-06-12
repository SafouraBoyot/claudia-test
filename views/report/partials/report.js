<!DOCTYPE html>
<!-- 'method' coming back from Post Data, dictates html class here -->
<html class="<?php echo $post_data['method']; ?>"> 
<head>
	<meta charset="UTF-8">
	<title>Cloud Adoption: A Change Readiness Self-Assessment</title>
	<link rel="stylesheet" href="css/report.css" type="text/css" media="all"/>
</head>
<body>
	<div class="aws-crt-report">
	</div>
	<script>
		// generate chart using percentages coming back from data from API
	var reportChartData = [<?php
		chartData = [
			post_data['results']['B']['percentage'],
			post_data['results']['C']['percentage'],
			post_data['results']['D']['percentage'],
			post_data['results']['E']['percentage'],
			post_data['results']['F']['percentage'],
			post_data['results']['G']['percentage'],
			post_data['results']['H']['percentage'],
		]

		print(chartData.join(","));
		?>];
	</script>
	<script src="js/jquery.js"></script>
    <script src="js/app.js" defer="defer"></script>
</body>
</html>