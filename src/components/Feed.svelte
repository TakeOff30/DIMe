<script>
	import { userData } from '../stores/userStore';
	import Post from './Post.svelte';
	console.log($userData.feed);
</script>

<div>
	{#each $userData.feed as post}
		<Post postData={post} />
	{/each}
</div>
