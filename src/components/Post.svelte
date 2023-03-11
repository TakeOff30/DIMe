<script lang="ts">
	export let postData;

	const showComments = () => {};
</script>

<div>
	<h3>{postData.username}</h3>
	<p>{postData.content}</p>
	<span>
		<button>Like</button>
		<button>Comment</button>
	</span>
	<!-- <ul>
		{showComments}
	</ul> -->
</div>
