<script lang="ts">
	import { userData, userPosts } from '../stores/userStore';
	import { Firebase } from '../firebase';

	let content = '';
</script>

<div>
	<textarea
		bind:value={content}
		placeholder="What's poppin?"
		rows="5"
	/>
	<button
		on:click={() => {
			Firebase.createPost($userData, content);
			content = '';
		}}>Post</button
	>
</div>

<style lang="sass">
	div 
		padding: 1em
		display: flex
		justify-content: space-around
		align-items: center
	textarea
		width: 70%
		resize: none
		padding: .2em
		border: 3px solid black
		border-radius: 10px
		font-size: 1.2em
</style>
