<script>
	import { location } from 'svelte-spa-router';
</script>

<nav>
	<a href="#/"
		><img
			class="icon"
			src={$location == '/'
				? '../assets/homeF.png'
				: '../assets/home.png'}
			alt="home link"
		/></a
	>
	<a href="#/profile"
		><img
			class="icon"
			src={$location == '/profile'
				? '../assets/userF.png'
				: '../assets/user.png'}
			alt="profile link"
		/></a
	>
	<a href="#/searchPage"
		><img
			class="icon"
			src={$location == '/searchPage'
				? '../assets/searchF.png'
				: '../assets/search.png'}
			alt="search link"
		/></a
	>
</nav>

<style lang="sass">

	@use '../styles/variables'

	nav 
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		display: flex
		align-items: center
		justify-content: space-around
		background-color: variables.$primary-color
		border-radius: 30px 30px 0 0
		padding: .2em 0 1em 0
		box-shadow: variables.$primary-color 0px -10px 30px 30px
		z-index: 5

</style>
