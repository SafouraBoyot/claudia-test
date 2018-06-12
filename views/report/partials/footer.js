const text = `
<div class="page-footer position-bottom pb-3 px-2">
	<div class="container-fluid">
		<p class="m-0 small">&copy; Amazon Web Services <?php echo date('Y'); ?></p>
	</div>
</div>
`

const template = Handlebars.compile(text)

export default template