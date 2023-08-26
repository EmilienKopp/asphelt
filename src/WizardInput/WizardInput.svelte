<script lang="ts">
    import { onMount } from "svelte";
    import { twJoin, twMerge } from "tailwind-merge";

    export let placeholder: string = "Type here...";
    export let type: string = "text";
    export let label: string;
    export let name: string;
    export let data: any = {};
    export let color: 'primary' | 'secondary' | 'gray' | 'red' | 'yellow' | 'green' | 'indigo' | 'purple' | 'pink' | 'blue' | 'custom' = 'primary';
    export let customColor: string = '';

    onMount(() => {
        const element: HTMLElement | null = document.querySelector(`input[name="${name}"]`) ?? document.querySelector(`textarea[name="${name}"]`);
        element?.focus();
    });

    const colors = {
        primary: 'placeholder-primary-300 dark:placeholder-primary-400 focus:border-primary-300 dark:focus:border-primary-400',
        secondary: 'placeholder-secondary-300 dark:placeholder-secondary-900 focus:border-secondary-300 dark:focus:border-secondary-900',
        gray: 'placeholder-gray-300 dark:placeholder-gray-600 focus:border-gray-300 dark:focus:border-gray-600',
        red: 'placeholder-red-300 dark:placeholder-red-900 focus:border-red-300 dark:focus:border-red-900',
        yellow: 'placeholder-yellow-200 dark:placeholder-yellow-600 focus:border-yellow-200 dark:focus:border-yellow-600',
        green: 'placeholder-green-300 dark:placeholder-green-900 focus:border-green-300 dark:focus:border-green-900',
        indigo: 'placeholder-indigo-300 dark:placeholder-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-900',
        purple: 'placeholder-purple-300 dark:placeholder-purple-900 focus:border-purple-300 dark:focus:border-purple-900',
        pink: 'placeholder-pink-300 dark:placeholder-pink-900 focus:border-pink-300 dark:focus:border-pink-900',
        blue: 'placeholder-blue-300 dark:placeholder-blue-900 focus:border-blue-300 dark:focus:border-blue-900',
        custom: customColor,
    }

</script>

<div class="flex flex-col">
    <label for={name} class="mb-2">{label}</label>
    {#if type == "textarea"}
        <textarea {name} {placeholder} bind:value={data[name]} spellcheck="false" class={ twMerge("focus:outline-none focus:shadow-inner rounded-md shadow-md px-4 py-2.5 text-lg",colors[color])}></textarea>
    {:else if type == "number"}
        <input type="number" {name} {placeholder} bind:value={data[name]} spellcheck="false" class={ twMerge("focus:outline-none focus:shadow-inner rounded-md shadow-md px-4 py-2.5 text-lg",colors[color])}/>
    {:else if type == "email"}
        <input type="email" {name} {placeholder} bind:value={data[name]} spellcheck="false" class={ twMerge("focus:outline-none focus:shadow-inner rounded-md shadow-md px-4 py-2.5 text-lg",colors[color])}/>
    {:else if type == "password"}
        <input type="password" {name} {placeholder} bind:value={data[name]} spellcheck="false" class={ twMerge("focus:outline-none focus:shadow-inner rounded-md shadow-md px-4 py-2.5 text-lg",colors[color])}/>
    {:else}
        <input type="text" {name} {placeholder} bind:value={data[name]} spellcheck="false" class={ twMerge("focus:outline-none focus:shadow-inner rounded-md shadow-md px-4 py-2.5 text-lg",colors[color])}/>
    {/if}
</div>

<style>
    label {
        @apply text-gray-500;
    }

    input, textarea {
        -webkit-spell-checker: none;
    }
</style>