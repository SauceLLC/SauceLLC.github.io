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
        const orders = [];
        for (let i = 0; i < patrons.length; i++) {
            orders.push(i);
        }
        let order = 0;
        for (const i of shuffle(orders)) {
            const brag = document.createElement('div');
            brag.classList.add('brag');
            const p = patrons[i];
            brag.textContent = brags[i % brags.length];
            p.appendChild(brag);
            p.style.order = order++;
        }
    }

    addEventListener('DOMContentLoaded', onDOMLoaded);
})();

