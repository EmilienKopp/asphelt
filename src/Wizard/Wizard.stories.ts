import ComplexDemo from '../ComplexDemo/ComplexDemo.svelte';
import Demo from '../Demo/Demo.svelte';
import Wizard from './Wizard.svelte';
import WizardInput from '../WizardInput/WizardInput.svelte';
import Wrapper from '../Wrapper/Wrapper.svelte';
import { someStore } from '../store';

export default {
    title: 'Wizard',
    component: Wizard,
    tags: ['autodocs'],
    excludeStories: /.*someStore$/,
};

const mockAction: Function = async () => {
    if (!confirm( 'Launch Custom Action?' )) return;
    let data;
    someStore.subscribe((value) => {
        data = value;
    });
    console.log(data);
    await fetch('https://httpbin.org/post', {method: 'POST', body: JSON.stringify(data)})
}



export const emptyPrimary = {
    args: {
        action: '/',
        opensNewTab: true,
        steps: [
            {
                title: 'Step 1',
            },
            {
                title: 'Step 2',
            },
            {
                title: 'Step 3',
            },
        ]
    }
}

export const emptyBlue = {
    args: {
        ...emptyPrimary.args,
        color: 'blue'
    }
}

export const emptyGreen = {
    args: {
        ...emptyPrimary.args,
        color: 'green'
    }
}

export const dashed = {
    args: {
        action: '/',
        opensNewTab: true,
        stepIndicator: 'dashed',
        steps: [
            {
                title: 'Step 1',
            },
            {
                title: 'Step 2',
            },
            {
                title: 'Step 3',
            },
        ]
    }
}



export const WithWizardInputs = {
    args: {
        ...emptyPrimary.args,
        steps: [
            {
                title: 'Name',
                component: WizardInput,
                props: {
                    label: 'Name',
                    placeholder: 'Enter your name',
                    name: 'name'
                }
            },
            {
                title: 'Address',
                component: WizardInput,
                props: {
                    label: 'Address',
                    type: 'textarea',
                    name: 'address',
                    placeholder: 'Enter your address',
                }
            },
            {
                title: 'Email',
                component: WizardInput,
                props: {
                    label: 'Email',
                    type: 'email',
                    name: 'email',
                    placeholder: 'Enter your email',
                }
            },
        ]
    }
}

export const WithCustomComponents = {
    decorators: [
        () => Wrapper
    ],
    args: {
        ...emptyPrimary.args,
        action: mockAction,
        steps: [
            {
                title: 'Blank Demo',
                component: Demo,
            },
            {
                title: 'Props!',
                component: Demo,
                props: {
                    content: 'The same component as earlier, but this content was passed through props!'
                }
            },
            {
                title: 'Shared Data',
                component: Demo,
                props: {
                    readStore: true,
                }
            },
            {
                title: 'Complex Example',
                component: ComplexDemo,
                props: {
                    title: 'Some complex example',
                    description: 'The title and description were passed through props. The rest through shared data. The input fields are bound to the shared data store.',
                    action: mockAction,
                }
            }
        ]
    }
}