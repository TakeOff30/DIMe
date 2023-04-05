<script>
	export let comment;
	console.log(comment);
</script>

<div>
	<h3>{comment.username}</h3>
	<p>{comment.text}</p>
	<h5>{new Date(comment.timestamp).toLocaleDateString()}</h5>
</div>

<style lang="sass">
	div
		margin: 1.3em 0 1em 1em
		padding: 1em
	p
		margin: .5em 0 .5em .5em
</style>
