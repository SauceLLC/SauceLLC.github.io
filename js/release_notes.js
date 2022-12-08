(function() {
    const notesPromise = (async function() {
        const uri = location.protocol === 'file:' ? 'https://sauce.llc/' : '/';
        return await fetch(uri + 'release_notes.json').then(x => x.json());
    })();


    function notesToHTML(notes) {
        const html = [];
        for (const x of notes) {
            if (typeof x === 'string') {
                html.push(`<li>${x}</li>`);
            } else {
                html.push(`<li>${x.html}</li>`);
                if (x.children && x.children.length) {
                    html.push(`<ul>${notesToHTML(x.children)}</ul>`);
                }
            }
        }
        return html.join('');
    }


    async function onDOMLoaded() {
        const notes = await notesPromise;
        const frag = document.createDocumentFragment();
        for (const x of notes.reverse()) {
            if (x.private) {
                continue;
            }
            const release = document.createElement('release');
            release.id = x.version;
            release.innerHTML = `
                <header>
                    <div class="version">v${x.version}</div>
                    <div class="date">${new Date(x.ts).toLocaleDateString()}</div>
                </header>
                <ul class="notes">${notesToHTML(x.notes)}</ul>
            `;
            frag.appendChild(release);
        }
        document.querySelector('section.notes').appendChild(frag);
    }

    addEventListener('DOMContentLoaded', onDOMLoaded);
})();
