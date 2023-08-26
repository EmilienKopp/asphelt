<script lang="ts">
    import Code from './Code.svelte';

    export let block: boolean = false;
    export let data: any = undefined;
    export let micro: boolean = false;
    export let slot: any = undefined;
</script>

<Code {block} {data} {micro}>
    {#if slot}
        {slot}
    {/if}
</Code>