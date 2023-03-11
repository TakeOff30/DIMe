<script>
	import {
		collection,
		getDocs,
		query,
		where,
		addDoc,
		getDoc,
		doc,
		updateDoc,
	} from 'firebase/firestore';
	import { db } from '../firebase';
	import { userData } from '../stores/userStore';

	let toSearch = '';
	let result = null;

	const searchUser = async () => {
		const q = await getDocs(
			query(collection(db, 'users'), where('username', '==', toSearch))
		);
		result = q.docs.at(0).data();
		console.log(result);
	};

	const addFollower = async () => {
		await addDoc(collection(db, 'followers'), {
			follower_id: $userData.uid, //to solve
			followed_id: result.uid,
		});
		await updateDoc(doc(db, 'users', $userData.uid), {
			following: parseInt($userData.following) + 1,
		});
		await updateDoc(doc(db, 'users', result.uid), {
			followers: parseInt(result.followers) + 1,
		});
	};
</script>

<span>
	<input bind:value={toSearch} />
	<button on:click={searchUser}>Search</button>
</span>

{#if result}
	<div>
		<h2>{result.username}</h2>
		<button on:click={addFollower}>Follow</button>
	</div>
{/if}
