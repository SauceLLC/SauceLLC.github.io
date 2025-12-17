addEventListener('DOMContentLoaded', () => {
    const browser = document.documentElement.dataset.browser;
    const installLink = document.querySelector(`a.store-install.${browser}`);
    if (installLink) {
        installLink.classList.remove('hidden');
    }
});
