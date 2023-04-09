<script>
	import { Firebase } from '../firebase';
	import { mainUserData } from '../stores/userStore';
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
				Firebase.createComment(postData, comment, $mainUserData);
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
