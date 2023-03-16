import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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
	const login = (email, password) => {
		signInWithEmailAndPassword(auth, email, password).catch((error) => {
			console.log(error);
		});
	};
    
    const signup = (userInfo) => {
		createUserWithEmailAndPassword(
			auth,
			userInfo.email,
			userInfo.password
		)
			.then(async (userCredential) => {
				return await setDoc(doc(db, 'users', userCredential.user.uid), {
					uid: userCredential.user.uid,
					username: userInfo.username,
					bio: userInfo.bio,
					followers: 0,
					following: 0,
					email: userCredential.user.email,
				});
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});
	};

    const createPost = async (user, content) => {
		await addDoc(collection(db, 'posts'), {
			uid: user.uid,
			username: user.username,
			content: content,
			likes: 0,
			timestamp: Date.now(),
		});
	};

    const searchUser = async (username) => {
		const q = getDocs(
			query(collection(db, 'users'), where('username', '==', username))
		);
		return (await q).docs.at(0).data();
	};

    const addFollower = async (follower, followed) => {
		await addDoc(collection(db, 'followers'), {
			follower_id: follower.uid,
			followed_id: followed.uid,
		});
		await updateDoc(doc(db, 'users', follower.uid), {
			following: parseInt(follower.following) + 1,
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
		login,
        signup,
        createPost,
        searchUser,
        addFollower,
		getComments,
		createComment
	}
})();

export { Firebase, auth, db}