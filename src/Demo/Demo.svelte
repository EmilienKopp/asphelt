<script lang="ts">
    import Code from '../Code/Code.svelte';
    import { someStore } from "../store";
    export let content: string = "This is a demo Component! It does nothing, it just likes to lie here and look pretty.";
    export let shared: any = undefined;
    export let readStore: boolean = false;

</script>


<div class="w-full">
    {#if readStore}
        <p class="italic w-full">
            This is a demo component. The values here come from a svelte store that <strong>wasn't</strong> passed as a prop, but imported in the component.
        </p>
        Content <small class="italic">(Try and edit it!)</small> : <input class="w-full hover:border-gray-300 rounded-md shadow" bind:value={$someStore.content} name="content" type="text"/>
        <br/>
        Number: {$someStore.number}
    {:else}
        {content}
    {/if}
</div>
<hr class="my-3"/>

<ul class="font-mono">
    <li>
        Component: <Code>Demo.svelte</Code>
    </li>
    <li>
        Props: <br/>
        <Code block>{JSON.stringify($$props,null,1)}</Code>
    </li>
</ul>


<style>
    code {
        @apply bg-gray-100 rounded-md p-1.5;
    }
</style>