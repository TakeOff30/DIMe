<script lang="ts">
	import { userData } from '../stores/userStore';
	import { Firebase } from '../firebase';

	let content = '';
</script>

<div>
	<textarea
		bind:value={content}
		placeholder="What's poppin?"
	/>
	<button
		on:click={() => {
			Firebase.createPost($userData, content);
			content = '';
		}}>Post</button
	>
</div>
