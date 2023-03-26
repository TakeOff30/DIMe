
import { writable } from "svelte/store";

let user = writable(null);
let userData = writable(null);
let userPosts = writable(null);

export {user, userData, userPosts};
