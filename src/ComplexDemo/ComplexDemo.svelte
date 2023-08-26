<script lang="ts">
    import { Spinner } from "flowbite-svelte";
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
                {#if $someStore.fetching}
                    {#await $someStore.fetching}
                        <div class="w-full flex items-center justify-center">
                            <Spinner/>
                        </div>
                    {/await}
                {:else}
                    {#if $someStore[key]?.length < 30}
                        {key}: <input class="rounded-md shadow border" name={key} placeholder={key} bind:value={$someStore[key]} />
                    {:else}
                        <div class="my-2 flex flex-col">
                            {key}: <textarea class="rounded-md border shadow" rows="5" name={key} placeholder={key} bind:value={$someStore[key]} />
                        </div>
                    {/if}
                {/if}
            </li>
        {/each}
    </ul>
    <p class="mt-2">Check the Json ouput below to see the changes to the data reflected <strong>outside</strong> the component! </p>
    <p>You can just store use the wizard to set a store, or post the data as a form...</p>
    <p>The only limit is <strong class="text-lg">your imagination</strong>!</p>
    <hr class="my-2"/>
    Custom Action <small>(just passed the function pointer to the <Code>Code</Code> component)</small>: <Code micro block>{action}</Code>
</div>


<style>
    li {
        @apply flex flex-col;
    }
    
    input {
        @apply bg-white border rounded-md ml-4 p-1 w-full;
    }
</style>