<script>
	import { Firebase } from '../firebase';
	import { userData } from '../stores/userStore';

	let toSearch = '';
	let result = null;
</script>

<span>
	<input bind:value={toSearch} />
	<button
		on:click={() => {
			Firebase.searchUser(toSearch).then((value) => {
				console.log(value);
				result = value;
			});
			console.log(result);
		}}>Search</button
	>
</span>

{#if result}
	<div>
		<h2>{result.username}</h2>
		<button
			on:click={() => {
				Firebase.addFollower($userData, result);
			}}>Follow</button
		>
	</div>
{/if}

<style lang="sass">

</style>
