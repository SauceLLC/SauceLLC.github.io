(function() {
    const patrons = (async function() {
        const uri = location.protocol === 'file:' ? 'https://saucellc.io/' : '/';
        const [brags, supporters] = await Promise.all([
            fetch(uri + 'brags.json').then(x => x.json()),
            fetch(uri + 'supporters.json').then(x => x.json())
        ]);
        if (brags.length < supporters.length) {
            console.warn("Need more brags!");
        }
        return {brags, supporters};
    })();
        

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
        const orders = [];
        const {brags, supporters} = await patrons;
        for (let i = 0; i < supporters.length; i++) {
            orders.push(i);
        }
        const frag = document.createDocumentFragment();
        for (const i of shuffle(orders)) {
            const patron = document.createElement('patron');
            patron.textContent = supporters[i];
            const brag = document.createElement('div');
            brag.classList.add('brag');
            brag.textContent = brags[i % brags.length];
            patron.appendChild(brag);
            frag.appendChild(patron);
        }
        document.querySelector('section.supporters').appendChild(frag);
            
        //window.scrollTo(0, 0);
    }

    addEventListener('DOMContentLoaded', onDOMLoaded);
})();

