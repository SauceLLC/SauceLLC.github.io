(function() {
    async function load() {
        const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        const installLink = document.querySelector(`a.store-install.${isFirefox ? 'firefox' : 'default'}`);
        installLink.classList.remove('hidden');
    }
    addEventListener('load', load);
})();

