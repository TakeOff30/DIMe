<script>
	import { Firebase } from '../firebase';
	export let postData;
	let comment = '';
</script>

<span>
	<input
		bind:value={comment}
		placeholder="Comment..."
	/>
	<button
		on:click={() => {
			if (comment != '') {
				console.log(postData);
				Firebase.createComment(postData, comment);
				comment = '';
			}
		}}>Comment</button
	>
</span>

<style lang="sass">
	input
		width: 60%
	span
		display: flex
		align-items: center
		justify-content: space-between
		margin: 1em 0 1em 0
</style>
