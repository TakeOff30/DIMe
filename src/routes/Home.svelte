<script>
	import PostGenerator from '../components/PostGenerator.svelte';
	import Feed from '../components/Feed.svelte';
	import { user, userData, userPosts } from '../stores/userStore';
	import { Firebase } from '../firebase';

	if ($userData.uid !== $user.uid) {
		Firebase.getUserData($user).then((res) => {
			console.log(res);
			$userData = res.data;
			$userPosts = res.posts;
		});
	}
</script>

<PostGenerator />
<Feed />
