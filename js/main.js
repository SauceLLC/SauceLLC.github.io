(function() {
    function onDOMLoaded() {
        const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        const installLink = document.querySelector(`a.store-install.${isFirefox ? 'firefox' : 'default'}`);
        installLink.classList.remove('hidden');

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
        const pages = ['features', 'about', 'patron', 'support'];
        for (const x of pages) {
            if (location.pathname.match(new RegExp(`^\\/${x}(\\.html)?(\\?|$|#)`))) {
                const anchor = document.querySelector(`#${x}`);
                anchor.scrollIntoView();
                break;
            }
        }

    addEventListener('DOMContentLoaded', onDOMloaded);
    addEventListener('load', onLoad);
})();

