(function() {
    const relP = fetch('https://api.github.com/repos/SauceLLC/sauce4zwift-releases/releases/latest')
        .then(r => r.json())
        .then(l => l.assets.filter(x => x.name.match(/^sauce4zwift-.*?\.(zip|exe|AppImage)$/)));

    addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.s4z-dl a[data-platform]').forEach(async a => {
            const files = await relP;
            let file;
            if (a.dataset.platform === 'win32') {
                file = files.find(x => x.name.match(/\.exe$/));
            } else if (a.dataset.platform === 'darwin') {
                file = files.find(x => x.name.match(/\.zip/));
            } else if (a.dataset.platform === 'linux') {
                file = files.find(x => x.name.match(/\.AppImage/));
            } else {
                throw new Error("Invalid Platform: " + platform);
            }
            a.href = file.browser_download_url;
        });

        const lazyVideoOb = new IntersectionObserver((entries, observer) => {
            for (const x of entries) {
                if (x.isIntersecting) {
                    if (!x.target.src) {
                        x.target.src = x.target.dataset.src;
                        x.target.load();
                    } else if (x.target.paused) {
                        x.target.play();
                    }
                } else if (!x.target.paused) {
                    x.target.pause();
                }
            }
        });
        for (const x of document.querySelectorAll("video.lazy")) {
            lazyVideoOb.observe(x);
        }
    });
})();
