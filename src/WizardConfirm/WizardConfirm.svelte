<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";

    export let data: any = {};
    export let title: string = "Confirm";
    export let helperText: string = "Please double check your input. Click on a value to go back and edit it.";

    const dispatch = createEventDispatcher();
</script>

<fieldset class="border p-4">
    <legend class="px-2 text-lg font-black">{title}</legend>
    <p class="text-gray-500 text-xs mb-8">{helperText}</p>
    <div>
        <Table shadow>
            <TableHead>
                {#each Object.keys(data) as header}
                    {#if header != '_steps'}
                    <TableHeadCell>
                        {header}
                    </TableHeadCell>
                    {/if}
                {/each}
            </TableHead>
            <TableBody>
                <TableBodyRow>
                {#each Object.entries(data) as [key, value]}
                    {#if key != '_steps'}
                        <TableBodyCell>
                            <a role="button" href="#{data._steps[key]}" on:click={() => dispatch('edit', {step: data._steps[key]})}>
                                {value}
                            </a>
                        </TableBodyCell>
                    {/if}
                {/each}
                </TableBodyRow>
            </TableBody>
        </Table>
    </div>
    
</fieldset>

<style>
    fieldset {
        border-color: #e2e8f0;
    }
    
    a {
        @apply text-blue-400;
    }

    a:hover {
        @apply text-blue-600;
    }

    button {
        @apply px-2 py-1 rounded-md shadow-md border my-2 w-full text-left;
    }

    button:hover {
        @apply bg-blue-500 text-white shadow-inner;
    }

    table {
        @apply w-full border-collapse shadow rounded-md p-8;
    }
</style>