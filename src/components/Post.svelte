<script lang="ts">
	import {
		collection,
		doc,
		getDocs,
		limit,
		orderBy,
		query,
		where,
	} from 'firebase/firestore';
	import { Firebase } from '../firebase';
	import CommentSection from './CommentSection.svelte';

	export let postData;

	let commentsData = Firebase.getComments(postData.id);
</script>

<div>
	<h3>{postData.data.username}</h3>
	<p>{postData.data.content}</p>
	<span>
		<button>Like</button>
		<button>Comment</button>
	</span>
	<CommentSection />
</div>
