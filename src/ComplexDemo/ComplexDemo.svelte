<script lang="ts">
    import Code from "../Code/Code.svelte";
    import { someStore } from "../store";
    
    export let title: string, description: string;
    export let data: any = undefined;
    export let action: any;

    console.log(action);
</script>

<div class="w-3/5 mx-auto">
    <h1 class="text-lg font-bold">{title}</h1>
    <p class="italic">
        The title was passed through props in the `steps` array. The rest comes through a Svelte store. The input fields are bound to the shared data store.
        You can use the values modified in the Wizard outside of the component, throughout you app.
    </p>
    <ul>
        {#each Object.entries($someStore) as [key, value]}
            <li>
                {key}: <input name={key} placeholder={key} bind:value={$someStore[key]} />
            </li>
        {/each}
    </ul>
    <p class="mt-2">Check the Json ouput below to see the changes to the data reflected <strong>outside</strong> the component! </p>
    <p>You can just store use the wizard to set a store, or post the data as a form...</p>
    <p>The only limit is <strong class="text-lg">your imagination</strong>!</p>
    <hr class="my-2"/>
    Custom Action: <Code micro block>{action}</Code>
</div>


<style>
    li {
        @apply flex flex-col;
    }
    
    input {
        @apply bg-white border rounded-md ml-4 p-1 w-full;
    }
</style>