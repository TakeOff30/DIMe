import { writable } from "svelte/store";

let user = writable(null);
let userData = writable(null);

export {user, userData};
