<script lang="ts">
    import { twMerge } from "tailwind-merge";

    export let block: boolean = false;
    export let data: any = undefined;
    export let micro: boolean = false;

    let txt = JSON.stringify(data,null,1) ?? "";
    console.log(data, typeof data);
    if(typeof data == 'string') 
        txt = txt.replaceAll('"', '');

    const textSize = (micro ? 'text-[0.5rem] p-1' : 'p-1.5')

    

</script>

{#if block}
    <pre {...$$restProps} class={twMerge("w-full p-1.5 whitespace-pre-wrap",textSize)}><code >{txt}<slot/></code></pre>
{:else}
    <code {...$$restProps} class={twMerge("w-full whitespace-pre-wrap",textSize)}>{txt}<slot/></code>
{/if}



<style>
    pre, code {
        @apply bg-gray-100 rounded-md text-gray-800 font-mono;
    }
</style>