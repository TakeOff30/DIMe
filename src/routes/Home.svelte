<script>
	import PostGenerator from '../components/PostGenerator.svelte';
	import Feed from '../components/Feed.svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { user, userData, userPosts } from '../stores/userStore';
	import { db, Firebase } from '../firebase';
	import { push } from 'svelte-spa-router';

	if ($userData.uid !== $user.uid) {
		Firebase.getUserData($user).then((res) => {
			$userData = res.data;
			$userPosts = res.posts;
		});
	}
</script>

<PostGenerator />
<Feed />
