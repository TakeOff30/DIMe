<script>
	import { collection, getDocs, query, where } from 'firebase/firestore';
	import Post from '../components/Post.svelte';
	import { db } from '../firebase';

	export let user;
	let posts = [];
	const q = query(collection(db, 'posts'), where('uid', '==', user.uid));
	getDocs(q).then((snapShot) => {
		snapShot.forEach((doc) => {
			posts.push({
				id: doc.id,
				data: doc.data(),
			});
		});
		posts = posts;
	});
</script>

<h1>{user.username}</h1>
<p>{user.bio}</p>
<span>
	<h3>Followers: {user.followers}</h3>
	<h3>Following: {user.following}</h3>
</span>
<div>
	{#each posts as post}
		<Post postData={post} />
	{/each}
</div>
