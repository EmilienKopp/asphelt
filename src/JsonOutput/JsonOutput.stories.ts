import JsonOutput from '../JsonOutput/JsonOutput.svelte';

export default {
    title: 'JsonOutput',
    component: JsonOutput,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        object: {
            name: 'John Doe',
            age: 30,
            cars: [
                { name: 'Ford', models: ['Fiesta', 'Focus', 'Mustang'] },
                { name: 'BMW', models: ['320', 'X3', 'X5'] },
                { name: 'Fiat', models: ['500', 'Panda'] },
            ],
        }
    }
}

export const WithTitle = {
    args: {
        label: 'JSON Output',
        object: {
            name: 'John Doe',
            age: 30,
            cars: [
                { name: 'Ford', models: ['Fiesta', 'Focus', 'Mustang'] },
                { name: 'BMW', models: ['320', 'X3', 'X5'] },
                { name: 'Fiat', models: ['500', 'Panda'] },
            ],
        }
    }
}