<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { twMerge } from "tailwind-merge";

    const dispatch = createEventDispatcher();

    export let type: "button" | "a" = "a";
    export let title: string;
    export let href: string | undefined =  type == "a" ? "#" : undefined;
    export let rounded: boolean = false;
    export let external: boolean = false;
    export let submit: boolean = false;
    export let color: "red" | "blue" | "orange" | "yellow" | "green" | "default" = "default";
    export let text: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" = "sm";

    const colors = {
        default: "bg-[--color-background-offset]",
        red: "bg-red-100",
        blue: "bg-blue-100",
        orange: "bg-orange-100",
        yellow: "bg-yellow-100",
        green: "bg-green-100"
    }

    const textSizes = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl"
    }
    
    let target: string | undefined = external ? "_blank" : undefined;

</script>


<svelte:element 
        this={submit ? "button" : type} 
        class={ rounded
            ? twMerge(`justify-center font-mono shadow-btn-round text-light-blue-light hover:text-light-blue-dark border-2 inline-flex items-center last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-center `,
                        colors[color], textSizes[text],$$restProps.class)
            : twMerge(`justify-center font-mono text-light-blue-light hover:text-light-blue-dark bg-light-secondary shadow-btn hover:border-2 hover:shadow-btn-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center last-of-type:mr-0 border-2 border-transparent `,
                        colors[color],textSizes[text],$$restProps.class)
        }
        on:click={() => dispatch("click")}
        tabindex="0"
        role={type == "a" ? "button" : undefined}
        {title}
        {href}
        type={ submit ? "submit" : type}
        {target}
        {...$$restProps}
        >

    <slot/>

    <span class="sr-only">{title}</span>
</svelte:element>