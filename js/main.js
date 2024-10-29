(function() {
    function onDOMLoaded() {
        const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        const isEdge = navigator.userAgent.indexOf(" Edg/") !== -1;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const browser = isFirefox ? 'firefox' : isSafari ? 'safari' : 'chrome';
        if (isEdge) {
            document.documentElement.classList.add('edge-browser');
        }
        const installLink = document.querySelector(`a.store-install.${browser}`);
        installLink.classList.remove('hidden');

        const supEl = document.querySelector('a.supporter-highlight');
        supP.then(x => supEl.textContent = x[Math.floor(Math.random() * x.length)].name);

        const anchorLinks = document.querySelectorAll('a.anchor');
        for (const x of anchorLinks) {
            x.addEventListener('click', ev => {
                let page = ev.currentTarget.hash.substr(1);
                if (page === 'top') {
                    page = '/'; 
                }
                ga('set', {page});
                ga('send', 'pageview');
                if (window.history && history.pushState) {
                    history.pushState(null, null, page);
                    document.querySelector(ev.currentTarget.hash).scrollIntoView();
                    ev.preventDefault();
                }
            });
        }
    }

    function onLoad() {
        const pages = ['features', 'about', 'patron', 'contact'];
        for (const x of pages) {
            if (location.pathname.match(new RegExp(`^\\/${x}(\\.html)?(\\?|$|#)`))) {
                const anchor = document.querySelector(`#${x}`);
                anchor.scrollIntoView();
                break;
            }
        }
    }

    const supP = fetch('https://www.sauce.llc/supporters-v2.json').then(x => x.json());
    addEventListener('DOMContentLoaded', onDOMLoaded);
    addEventListener('load', onLoad);
})();

