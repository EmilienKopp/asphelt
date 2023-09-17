<script lang="ts">
    export let width: string | undefined = undefined;
    export let direction: "row" | "col" = "row";
</script>


<div class="shadow-box rounded-2xl {width}">
    <div class="rounded-2xl w-full flex flex-{direction} justify-around sm:w-full px-1.5 py-1.5 md:px-3 md:py-3 h-fit">
        <slot/>
    </div>
</div>

<style>
    .shadow-box {
    @apply p-4 bg-[--color-background] z-50;
        --tw-shadow: 0px -6px 24px #FFFFFF, 0px 7px 16px rgba(104, 132, 157, .5);
        --tw-shadow-colored: 0px -6px 24px var(--tw-shadow-color), 0px 7px 16px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
        border-left: 1px solid var(--color-border-offset);
        border-top: 1px solid var(--color-border-offset);
    }

    .dark .shadow-box {
        background-image: radial-gradient(51.95% 152.6% at 26.24% -102.6%,rgba(252,119,23,.32) 0%, rgba(238,131,53,0) 100%),
                        linear-gradient(144.05deg,#32383E -69.07%,#17191C 122.22%);
        @apply p-4 bg-[--color-background] z-50;
        --tw-shadow: 0px -6px 24px var(--color-background-reverse-offset), 0px 4px 10px #000;
        --tw-shadow-colored: 0px -6px 24px var(--tw-shadow-color), 0px 7px 16px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)
    }
</style>