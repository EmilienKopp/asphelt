<script lang="ts">
    import { someStore } from "../store";
    import JsonOutput from "../JsonOutput/JsonOutput.svelte";
</script>

<div>
    <slot />
    <JsonOutput label="Svelte Store (visible throughout the app)" object={$someStore} />
</div>