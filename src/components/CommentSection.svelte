<script>
	import {
		collection,
		limit,
		onSnapshot,
		orderBy,
		query,
	} from 'firebase/firestore';
	import { db, Firebase } from '../firebase';
	import Comment from './Comment.svelte';
	import CommentGenerator from './CommentGenerator.svelte';
	export let postData;
	let commentsData = [];
	onSnapshot(
		query(
			collection(db, `posts/${postData.postid}/comments`),
			orderBy('timestamp', 'desc'),
			limit(10)
		),
		(snapShot) => {
			commentsData = [];
			snapShot.docs.forEach((comment) => {
				commentsData.push(comment.data());
			});
			commentsData = commentsData;
		}
	);
</script>

<CommentGenerator {postData} />

<div>
	{#each commentsData as comment}
		<Comment {comment} />
	{/each}
</div>

<style lang="sass">
	@use '../styles/variables'
	div
		border-radius: 20px
		color: variables.$primary-color
		background-color: variables.$white
</style>
