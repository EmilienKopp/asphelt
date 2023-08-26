import Code from '../Code/Code.svelte';
import MiniWrapper from './MiniWrapper.svelte';

function fizzBuzzOneLiner(max: number = 100) {
    for (let i = 1; i <= max; i++) {
        console.log((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i);
    }
}

const code = `
function fizzBuzzOneLiner() {
    for (let i = 1; i <= 100; i++) {
        console.log((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i);
    }
}
`;

export default {
    title: 'Code',
    component: MiniWrapper,
    tags: ['autodocs'],
};

export const Inline = {
    args: {
        data: 'const theAnswer = 42;'
    }
}

export const Block = {
    args: {
        block: true,
        slot: fizzBuzzOneLiner
    }
}

export const MicroInline = {
    args: {
        micro: true,
        data: 'const theAnswer = 42; // 42 is the answer to life, the universe, and everything'
    }
}

export const MicroBlock = {
    args: {
        block: true,
        micro: true,
        slot: fizzBuzzOneLiner,
    }
}