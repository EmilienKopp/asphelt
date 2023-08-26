<script lang="ts"> 
    export let object: any;
    export let label: string | undefined = undefined;
</script>

<div class="mt-2">
    {#if label}
        <h2 class="text-xl font-bold text-gray-500">{label}:</h2>
    {/if}
    <pre class="text-white bg-slate-700 border rounded-md p-2">{JSON.stringify(object, null, 2)}</pre>
</div>