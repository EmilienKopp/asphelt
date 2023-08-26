<script lang="ts">
	import Wizard from "./Wizard/Wizard.svelte";
	import type { Step } from "./types";
	import JsonOutput from "./JsonOutput/JsonOutput.svelte";
    import WizardInput from "./WizardInput/WizardInput.svelte";
    import WizardConfirm from "./WizardConfirm/WizardConfirm.svelte";
    import { Select } from "flowbite-svelte";
    import ComplexDemo from "./ComplexDemo/ComplexDemo.svelte";

	let wizardData: any;
	let color: 'primary' | 'secondary' | 'gray' | 'red' | 'yellow' | 'green' | 'indigo' | 'purple' | 'pink' | 'blue' | 'custom' = "primary";
	let type: 'default' | 'dashed' = "default";

	const colors = ["primary", "secondary", "gray", "red", "yellow", "green", "indigo", "purple", "pink", "blue"];
	const steps = [
		{title: "Name", component: WizardInput, props: {placeholder: "Your name", name: "name", label: "Name"}},
		{title: "Age", component: WizardInput, props: {placeholder: "Your age", type: "number", name: "age", label: "Age"}},
		{title: "Email", component: WizardInput, props: {placeholder: "Your email", name: "email", label: "Email"}},
		{title: "Phone", component: ComplexDemo},
		{title: "Verify", component: WizardConfirm, props: {object: wizardData}},
	];

	
    
</script>

<main class="p-5 mt-12">

	<div class="my-4 w-1/5">
		<Select bind:value={color}>
			{#each colors as color}
				<option value={color}>{color}</option>
			{/each}
		</Select>

		<Select bind:value={type} placeholder="step type">
			<option value="default">Default</option>
			<option value="dashed">Dashed</option>
		</Select>
	</div>

	<Wizard {steps} bind:shared={wizardData} {color} stepIndicator={type} action="/" />
	
	<JsonOutput object={$wizardData}/>
</main>

<style>

</style>
