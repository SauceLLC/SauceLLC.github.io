(function() {
    const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
    const isEdge = navigator.userAgent.indexOf(" Edg/") !== -1;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    document.documentElement.dataset.browser = isFirefox ? 'firefox' : isSafari ? 'safari' : 'chrome';
    document.documentElement.classList.toggle('edge-browser', isEdge);

    function onDOMLoaded() {

        supP.then(supporters => {
            const randoUpdate = () => {
                for (const x of document.querySelectorAll('a.supporter-highlight')) {
                    x.textContent = supporters[Math.random() * supporters.length | 0].name;
                }
            };
            randoUpdate();
            setInterval(randoUpdate, 8000);
        });

        const anchorLinks = document.querySelectorAll('a.anchor');
        for (const x of anchorLinks) {
            x.addEventListener('click', ev => {
                let page = ev.currentTarget.hash.substr(1);
                if (page === 'top') {
                    page = '/'; 
                }
                if (window.history && history.pushState) {
                    history.pushState(null, null, page);
                    document.querySelector(ev.currentTarget.hash).scrollIntoView();
                    ev.preventDefault();
                }
            });
        }

        for (const el of document.querySelectorAll('.image-compare')) {
            el.querySelector('.request-full-screen').addEventListener('click', () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    el.closest('main').requestFullscreen();
                }
            });
            el.querySelector('slider').addEventListener('pointerdown', evDown => {
                const rect = el.getBoundingClientRect();
                const abrt = new AbortController();
                const signal = abrt.signal;
                addEventListener('pointercancel', () => abrt.abort(), {signal});
                addEventListener('pointerup', () => abrt.abort(), {signal});
                addEventListener('pointermove', evMove => {
                    evMove.preventDefault();
                    evMove.stopPropagation();
                    const split = Math.max(0, Math.min(1, (evMove.pageX - rect.x) / rect.width));
                    el.style.setProperty('--split', split);
                }, {signal, capture: true});
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
