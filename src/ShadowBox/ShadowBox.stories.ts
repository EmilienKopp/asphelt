import Demo from '../Demo/Demo.svelte';
import ShadowBox from './ShadowBox.svelte';

export default {
    title: 'ShadowBox',
    component: Demo,
    tags: ['autodocs']
}

export const  Standard = {
    decorators: [
        () => ShadowBox
    ],
}