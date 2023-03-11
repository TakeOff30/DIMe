<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { userData } from '../stores/userStore';
	import { db } from '../firebase';

	let content = '';

	const createPost = async () => {
		console.log(db);
		await addDoc(collection(db, 'posts'), {
			uid: $userData.uid, //to solve
			username: $userData.username,
			content: content,
			likes: 0,
			timestamp: Date.now(),
		});
		content = '';
	};
</script>

<div>
	<h2>What are you thinking about?</h2>
	<textarea bind:value={content} />
	<button on:click={createPost}>Post</button>
</div>
