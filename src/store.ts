import { writable, type Writable } from "svelte/store";

export const someStore: Writable<any> = writable({
    name: 'Some Store',
    address: '123 Some Street',
    email: 'some@email.com',
    content: 'This is some content that exists in a Svelte store.',
    number: '42',
});