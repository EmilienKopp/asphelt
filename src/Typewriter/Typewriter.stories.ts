import Typewriter from './Typewriter.svelte';

export default { 
    title: 'Typewriter',
    component: Typewriter,
    tags: ['autodocs']
}

const code = `
let interval = setInterval(() => {
    caretVisible = !caretVisible;
}, caretInterval);

for (let i = 0; i < text.length; i++) {
    displayedText += text[i];
    if (text[i + 1] === ' ' && text[i + 2] === ' ') {
        caretVisible = false;
    } else {
        await new Promise(r => setTimeout(r, msPerCharacter));
    } 
}

caretVisible = false;
clearInterval(interval);
// For now, the content has to be indented with tabs in the template litteral.
    `;

const text = `
Four engineers get into a car. The car won't start.
The Mechanical engineer says "It's a broken starter".
The Electrical engineer says "Dead battery".
The Chemical engineer says "Impurities in the gasoline".
The IT engineer says: 
    "Hey guys, I have an idea: How about we all get out of the car and get back in".
`;

export const Text = {
    args: {
        msPerCharacter: 50,
        caretInterval: 400,
        text: text,
    }
}

export const Code = {
    args: {
        text: code,
    }
}


