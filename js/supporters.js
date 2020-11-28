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

    async function onDOMLoaded() {
        const brags = shuffle(await (await fetch('https://saucellc.io/brags.json')).json());
        const patrons = document.querySelectorAll(`patron`);
        let i = 0;
        for (const x of patrons) {
            const brag = document.createElement('div');
            brag.classList.add('brag');
            brag.textContent = brags[i++ % brags.length];
            x.appendChild(brag);
        }
    }

    addEventListener('DOMContentLoaded', onDOMLoaded);
})();

