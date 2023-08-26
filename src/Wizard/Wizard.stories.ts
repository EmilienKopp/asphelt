import ComplexDemo from '../ComplexDemo/ComplexDemo.svelte';
import Demo from '../Demo/Demo.svelte';
import Typewriter from '../Typewriter/Typewriter.svelte';
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
    someStore.set({ fetching: true})
    let res = fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
    someStore.set({ fetching: res});
    
    let data = await res.then(res => res.json());
    someStore.set({ joke: data.joke})
}



export const emptyPrimary = {
    args: {
        action: '/',
        opensNewTab: true,
        steps: [
            {
                title: 'Step 1',
                text: 'This is the first step. It has a text property.',
            },
            {
                title: 'Step 2',
                text: 'This is the second step. Text property again.',
            },
            {
                title: 'Step 3',
                text: 'This is the third step. Guess what ? It also a text property.',
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
        ...emptyPrimary.args,
        action: '/',
        opensNewTab: true,
        stepIndicator: 'dashed',
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
                title: 'Custom Component',
                component: Demo,
            },
            {
                title: 'Props!',
                component: Typewriter,
                props: {
                    text: `Another component. This time,the content was passed through step.props!`,
                    componentInfo: {
                        file: 'Typewriter.svelte',
                    }
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