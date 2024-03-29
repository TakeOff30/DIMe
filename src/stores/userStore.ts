
import { writable } from "svelte/store";

let user = writable(null);
let mainUserData = writable(null)
let userData = writable(null);
let userPosts = writable(null);
let userFollowers = writable(null)

export {user, userData, userPosts, userFollowers, mainUserData};
