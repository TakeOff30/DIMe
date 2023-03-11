<script>
	import { onMount } from 'svelte';

	export let user;
	console.log(user);
</script>

<h1>{user.username}</h1>
<p>{user.bio}</p>
<span>
	<h3>Followers: {user.followers}</h3>
	<h3>Following: {user.following}</h3>
</span>
