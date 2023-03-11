<script lang="ts">
	import { userData } from '../stores/userStore';
	import { Firebase } from '../firebase';

	let content = '';
</script>

<div>
	<h2>What are you thinking about?</h2>
	<textarea bind:value={content} />
	<button
		on:click={() => {
			Firebase.createPost($userData, content);
			content = '';
		}}>Post</button
	>
</div>
