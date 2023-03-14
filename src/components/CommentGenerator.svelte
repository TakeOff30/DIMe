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
			console.log(postData);
			Firebase.createComment(postData, comment);
			comment = '';
		}}>Comment</button
	>
</span>
