<script lang="ts">
    import { onMount } from 'svelte';
    import { twJoin, twMerge } from 'tailwind-merge';
    import Code from '../Code/Code.svelte';
    export let text = "";
    export let theme: "dark" | "light" = "light";
    export let msPerCharacter: number = 60;
    export let caretInterval: number = 500;
    export let componentInfo: any = undefined;

    let displayedText = "";
    let caretVisible = true;

    let colors = {
        dark: {
            bg: "bg-gray-900",
            caret: "bg-black",
            text: "text-white"
        },
        light: {
            bg: "bg-white",
            caret: "bg-black",
            text: "text-black"
        }
    }

    onMount(async () => {
        console.log(text);

        let interval = setInterval(() => {
            caretVisible = !caretVisible;
        }, caretInterval);

        for (let i = 0; i < text.length; i++) {
            displayedText += text[i];
            if (text[i + 1] === ' ' && text[i + 2] === ' ') {
                caretVisible = false;
            } else {
                await new Promise(r => setTimeout(r, msPerCharacter));
            } 
        }

        caretVisible = false;
        clearInterval(interval);
    });
</script>
<div class={twMerge("min-w-full p-2",colors[theme].bg)}>
    <pre class={twJoin("w-full whitespace-pre-wrap", colors[theme].text )}>
        {displayedText}<span class={twJoin(`caret ${caretVisible ? 'blink' : ''}`,colors[theme].caret)}></span>
    </pre>
</div>

{#if componentInfo}
<hr class="w-full my-3"/>
    {#each Object.entries(componentInfo) as [key,value]}
        {#if key == 'file'}
            {key}: <Code>{value}</Code>
        {:else}
            {key}: {value}
        {/if}
    {/each}
{/if}


<style>
    .caret {
        display: inline-block;
        width: 1ch;
        height: 1em;
        vertical-align: middle;
        opacity: 0;
        transition: opacity 0.1s;
    }

    .caret.blink {
        opacity: 1;
    }
</style>

