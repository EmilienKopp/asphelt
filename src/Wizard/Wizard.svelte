<script lang="ts">
    import { Button, Indicator, StepIndicator } from 'flowbite-svelte';
    import { writable, type Writable } from 'svelte/store';
    import type { Step } from '../types';
    import { onMount } from 'svelte';
    import { twMerge, twJoin } from 'tailwind-merge';
    import { slide, fly, fade } from 'svelte/transition';
    import { quartIn, quartOut, sineIn, sineInOut, sineOut } from 'svelte/easing';

    export let steps: Array<Step> = [];
    export let currentStep: number = 1;
    export let nextText: string = "Next";
    export let previousText: string = "Previous";
    export let doneText: string = "Done!";
    export let action: string | Function | undefined = undefined;
    export let shared: Writable<any> = writable({ _steps: {} }); // A svelte store to share values from the wizard to its children components
    export let nextKeys = ["Enter", "ArrowRight"];
    export let previousKeys = ["ArrowLeft"];
    export let keyboardNavigation: boolean = true;
    export let stepIndicator: "default" | "dashed" = "default";
    export let color: 'primary' | 'secondary' | 'gray' | 'red' | 'yellow' | 'green' | 'indigo' | 'purple' | 'pink' | 'blue' | 'custom' = 'primary';
    export let customDotColor: string = '';
    export let customRingColor: string = '';
    export let customTextColor: string = '';
    export let method: "GET" | "POST" | undefined = undefined;
    export let opensNewTab: boolean = false;

    onMount(() => {
        if(keyboardNavigation) document.addEventListener('keyup', handleKeyUp);
    });

    let container: HTMLFormElement | HTMLDivElement;

    const stepperColors = {
        current: {
            primary: 'bg-primary-500 dark:bg-primary-900',
            secondary: 'bg-secondary-500 dark:bg-secondary-900',
            gray: 'bg-gray-400 dark:bg-gray-600',
            red: 'bg-red-500 dark:bg-red-900',
            yellow: 'bg-yellow-400 dark:bg-yellow-600',
            green: 'bg-green-500 dark:bg-green-900',
            indigo: 'bg-indigo-500 dark:bg-indigo-900',
            purple: 'bg-purple-500 dark:bg-purple-900',
            pink: 'bg-pink-500 dark:bg-pink-900',
            blue: 'bg-blue-500 dark:bg-blue-900',
            custom: customDotColor,
        },
        unselected: {
            primary: 'bg-primary-200 dark:bg-primary-700',
            secondary: 'bg-secondary-200 dark:bg-secondary-700',
            gray: 'bg-gray-200 dark:bg-gray-700',
            red: 'bg-red-200 dark:bg-red-700',
            yellow: 'bg-yellow-200 dark:bg-yellow-700',
            green: 'bg-green-200 dark:bg-green-700',
            indigo: 'bg-indigo-200 dark:bg-indigo-700',
            purple: 'bg-purple-200 dark:bg-purple-700',
            pink: 'bg-pink-200 dark:bg-pink-700',
            blue: 'bg-blue-200 dark:bg-blue-700',
            custom: customRingColor,
        }
    }

    const indicatorTextColors = {
        primary: 'text-primary-500 dark:text-primary-900 hover:text-white',
        secondary: 'text-secondary-500 dark:text-secondary-900 hover:text-white',
        gray: 'text-gray-400 dark:text-gray-600 hover:text-white',
        red: 'text-red-500 dark:text-red-900 hover:text-white',
        yellow: 'text-yellow-400 dark:text-yellow-600 hover:text-white',
        green: 'text-green-500 dark:text-green-900 hover:text-white',
        indigo: 'text-indigo-500 dark:text-indigo-900 hover:text-white',
        purple: 'text-purple-500 dark:text-purple-900 hover:text-white',
        pink: 'text-pink-500 dark:text-pink-900 hover:text-white',
        blue: 'text-blue-500 dark:text-blue-900 hover:text-white',
        custom: customTextColor,
    }

    function handlePrevious() {
        if(currentStep == 1) return;
        currentStep--;
    }

    function handleNext() {
        if(currentStep == steps.length) return;
        currentStep++;
    }

    function handleEdit(e: CustomEvent<any>) {
        currentStep = e.detail.step;
    }

    function handleKeyUp(event: KeyboardEvent) {
        console.log(event.key);
        if (nextKeys.includes(event.key)) {
            event.preventDefault();
            console.log('keyup', event.key);
            handleNext();
        }

        if(previousKeys.includes(event.key)) {
            event.preventDefault();
            handlePrevious();
        }
    }

    function handleDone() {
        if(typeof action == "function") 
            action();
        else if(typeof action == "string") {
            if(container && container instanceof HTMLFormElement) {
                container.action = action;
                container.submit();
            }
        }
    }

    $: if($shared) {
        for(const [key,value] of Object.entries($shared)) {
            if(key == "_steps") continue;
            if($shared._steps[key] === undefined) $shared._steps[key] = currentStep;
        }
    }
</script>
  
<svelte:element this={method ? 'form' : 'div'}   id="wizard_div" class={twMerge("flex flex-col border p-3 rounded-md shadow mx-auto bg-white text-black min-h-[430px]", $$props.class)}
        bind:this={container} {method} {...$$restProps}>

    <div id="_stepper" class="w-full flex h-fit mb-2">
        {#if stepIndicator == "default"}
            {#each steps as step,index}
            {@const ringColor = (currentStep == index +1 ? stepperColors.current[color] : stepperColors.unselected[color])}
            {@const dotColor = ( index + 1 <= currentStep ? stepperColors.current[color] : stepperColors.unselected[color]) }
            {@const textColor = (index + 1 <= currentStep ? indicatorTextColors[color] : "text-gray-400 dark:text-gray-600")}

            <a role="button" class="w-full" href={null} on:click={() => currentStep = index + 1} on:keyup={() => currentStep = index}>
                <div class="relative w-full cursor-pointer" >
                    <div class="flex items-center">
                        <Indicator size="xl" color="none" 
                            class={twJoin("hover:bg-blue-200 hover:shadow bg-opacity-30 z-10 shrink-0", ringColor)}>
                            <Indicator color="none" class={dotColor} />
                        </Indicator>
    
        
                        <!-- Separator -->
                        {#if index != steps.length - 1}
                        <div class={twJoin("flex w-full h-0.5", dotColor)} />
                        {/if}
                    </div>
        
                    <div class="mt-3">
                        <h3 class={twJoin("font-medium text-start", textColor)}>{step.title}</h3>
                    </div>
                </div>
            </a>
            {/each}
        {/if}

        {#if stepIndicator == "dashed"}
        <div class="w-full">
            <StepIndicator steps={ steps.map(step => step.title) } {currentStep} {color} glow/>
        </div>
        {/if}
    </div>

    <div id="_content" class="flex items-center h-full flex-grow">
        <div class="w-24 flex items-center">
            {#if currentStep > 1}
                <Button class={twJoin(indicatorTextColors[color],stepperColors.unselected[color])} on:click={handlePrevious}>{previousText}</Button>
            {/if}
        </div>
    
        <div class="flex flex-col flex-grow items-center justify-around">
            <div class="flex flex-row">
                {#each steps as step,index}
                    {#if index == currentStep - 1}
                        <div class="flex-grow shadow-sm w-full p-8" out:fly={{x: 100, easing: quartOut}} in:fly={{x: -100, delay: 200, easing: quartIn}}>
                            <svelte:component this={step.component} {...step.props} bind:data={$shared} {color}
                                    on:edit={handleEdit} on:next={handleNext} on:previous={handlePrevious}/>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
        
        
    
        <div class="w-24 flex items-center">
            {#if currentStep < steps.length }
                <Button class={twJoin(indicatorTextColors[color],stepperColors.unselected[color])} on:click={handleNext}>{nextText}</Button>
            {:else if action}
                {#if typeof action == "string" && method == "GET"}
                    <a href={action} target={opensNewTab ? '_blank' : undefined}>
                        <Button type="button" class={stepperColors.current[color]}>{doneText}</Button>
                    </a>
                {:else if typeof action == "string" && method == "POST"}
                    <Button type="submit" class={stepperColors.current[color]}>{doneText}</Button>
                {:else}
                    <Button type="button" class={stepperColors.current[color]} on:click={handleDone}>{doneText}</Button>
                {/if}
            {/if}
        </div>
    </div>

</svelte:element>