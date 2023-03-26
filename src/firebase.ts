import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import * as yup from 'yup';

const firebaseConfig = {
    apiKey: 'AIzaSyDvqx6aavkZ95vai95O19wu9tg3wCLFGtc',
    authDomain: 'dime-20745.firebaseapp.com',
    projectId: 'dime-20745',
    storageBucket: 'dime-20745.appspot.com',
    messagingSenderId: '1005405323846',
    appId: '1:1005405323846:web:9eb6070bbe1c1d2e5c8047',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Firebase = (function() {
    
    const signup = (userInfo) => {
		createUserWithEmailAndPassword(
			auth,
			userInfo.email,
			userInfo.password
		)
			.then(async (userCredential) => {
				await setDoc(doc(db, 'users', userCredential.user.uid), {
					uid: userCredential.user.uid,
					username: userInfo.username,
					bio: userInfo.bio,
					followers: 0,
					following: 0,
					email: userCredential.user.email,
					feed: []
				});
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});
	};


    const createPost = async (user, content) => {
		const docRef = await addDoc(collection(db, 'posts'), {
			uid: user.uid,
			username: user.username,
			content: content,
			likes: 0,
			timestamp: Date.now(),
		});
		await updateDoc(docRef, {
			postid: docRef.id
		})
		addToFollowersFeed(user, {
			uid: user.uid,
			username: user.username,
			content: content,
			likes: 0,
			timestamp: Date.now(),
			postid: docRef.id
		});
	};

	const addToFollowersFeed = async (user, postData) =>{
		const followers = await getDocs(
			query(collection(db, 'followers'), where('followed_id', '==', user.uid))
		);
		followers.docs.forEach(async (follDoc)=>{
			const followerRef = await getDoc(doc(db, 'users', follDoc.data().follower_id))
			await updateDoc(doc(db, 'users', followerRef.data().uid), {
				feed: [...followerRef.data().feed, postData]
			});
		})
	}

	const deletePost = async (user, id) =>{
		await deleteDoc(doc(db, 'posts', id))
		removeFromFollowersFeed(user, id)
	}

	const removeFromFollowersFeed = async (user, postid) =>{
		const followers = await getDocs(
			query(collection(db, 'followers'), where('followed_id', '==', user.uid))
		);
		followers.docs.forEach(async (follDoc)=>{
			const followerRef = await getDoc(doc(db, 'users', follDoc.data().follower_id))
			let newFeed = followerRef.data().feed;
			newFeed = newFeed.filter(post => post.postid !== postid)
			await updateDoc(doc(db, 'users', followerRef.data().uid), {
				feed: newFeed
			});
		})
	}

    const searchUser = async (username) => {
		const q = await getDocs(
			query(collection(db, 'users'), where('username', '==', username))
		);
		return q.docs.at(0).data();
	};

    const addFollower = async (follower, followed) => {
		const followedPosts = await getDocs(
			query(collection(db, 'posts'), 
			where('uid', '==', followed.uid), 
			orderBy('timestamp', 'desc'))
		)
		if(followedPosts.docs.at(0) != undefined){
			await updateDoc(doc(db, 'users', follower.uid), {
				following: parseInt(follower.following) + 1,
				feed: [...follower.feed, followedPosts.docs.at(0).data()]
			});
		}else{
			await updateDoc(doc(db, 'users', follower.uid), {
				following: parseInt(follower.following) + 1
			});
		}
		await addDoc(collection(db, 'followers'), {
			follower_id: follower.uid,
			followed_id: followed.uid,
		});
		
		await updateDoc(doc(db, 'users', followed.uid), {
			followers: parseInt(followed.followers) + 1,
		});

	};


	const createComment = async (postData, commentText) =>{
		await addDoc(collection(db, `posts/${postData.id}/comments`), {
			username: postData.data.username,
			text: commentText,
			timestamp: Date.now(),
		})
	}

	const getPosts = async (user)=>{
		const posts = [];
		const q = await getDocs(
			query(
				collection(db, 'posts'), 
				where('uid', '==', user.uid)
			)
		);
	
		q.forEach((doc) => {
			posts.push({
				id: doc.id,
				data: doc.data(),
			});
		});
		return posts
	}

	const getComments = async (id) => {
		const comments = [];
		const q = await getDocs(
			query(
				collection(db, `posts/${id}/comments`),
				orderBy('timestamp', 'desc'),
				limit(10)
			)
		)
			
		q.forEach((doc) => {
			comments.push(doc.data());
		});
			
		console.log(comments)
		return comments;
	};

	return {
        signup,
        createPost,
		getPosts,
		deletePost,
        searchUser,
        addFollower,
		getComments,
		createComment,
	}
})();

export { Firebase, auth, db}