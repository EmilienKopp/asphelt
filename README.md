# Thanks for using Asphelt, a component and utility library for SvelteKit

## About Custom Stores:


### General idea

Provide svelte stores that work just like svelte stores, but are backed by localStorage or sessionStorage,
to persist data between sessions or avoid losing data on an eventual refresh.

### Importing

```ts
// stores/index.ts
import { localable } from '$lib/stores/localable';
import { sessionable } from '$lib/stores/sessionable';

const myStore = localable('myStore', {initialValue: 'initialValue'}); // persisted in localStorage
const myOtherStore = sessionable('myOtherStore', {initialValue: 'initialValue'}); // persisted in sessionStorage
```

### Using

```ts
// ○○.svelte
<script>
    import { myStore, myOtherStore } from '$lib/stores';

    $myStore.valueToStore = 'newValue';
    $myOtherStore.valueToStore = 'newValue';

</script>
```

### Warnings


The stores do not discriminate between users. Preferences saved locally will be shared between users. Any user-specific data storage has to be implemented manually.

Remember not to store any sensitive data in localStorage or sessionStorage!



