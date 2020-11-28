(function() {
    function shuffle(data) {
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
        return data;
    }

    function hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    async function onDOMLoaded() {
        const brags = await (await fetch('https://saucellc.io/brags.json')).json();
        const availBrags = Array.from(brags);
        const patrons = document.querySelectorAll(`patron`);
        let i = 0;
        for (const x of patrons) {
            const brag = document.createElement('div');
            brag.classList.add('brag');
            brag.textContent = availBrags.splice(Math.abs(hash(x.textContent)) % availBrags.length - 1, 1)[0];
            x.appendChild(brag);
        }
    }

    addEventListener('DOMContentLoaded', onDOMLoaded);
})();

