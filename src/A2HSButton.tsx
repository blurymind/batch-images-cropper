import React, {useState, useEffect, useRef} from 'react'

const A2HSButton = () => {
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const promptRef = useRef<any>(null)

    const isPWAInstalled = async () => {
        if ("getInstalledRelatedApps" in window.navigator) {
            console.log("check if pwa is installed")
            //@ts-ignore
            const relatedApps = await window.navigator.getInstalledRelatedApps();
            let installed = false;
            console.log({relatedApps})
            relatedApps.forEach((app: any) => {
                //if your PWA exists in the array it is installed
                console.log(app.platform, app.url);
                if (
                    app.url ===
                    "https://blurymind.github.io/batch-images-cropper/manifest.json"
                ) {
                    installed = true;
                }
            });
            const isAsPwa =  window.matchMedia('(display-mode: standalone)').matches
            setIsAppInstalled(installed || relatedApps.length > 0 || isAsPwa || promptRef?.current == null);
        }
    };

    useEffect(() => {
        const isAppInstalledHandler = () => {
            console.log('a2hs installed');
            setIsAppInstalled(true);
        }
        const handler = (event: any) => {
            // event.preventDefault();
            console.log("prompt set", {event})
            promptRef.current = event;
            isPWAInstalled();
        }
        window.addEventListener('beforeinstallprompt', handler)
        window.addEventListener('appinstalled', isAppInstalledHandler);
        isPWAInstalled();
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', isAppInstalledHandler);
        }
    }, []);

    const handleAddToHomeScreenClick = () => {
        console.log("try to install pwa", { promptRef})
        //@ts-ignore
        promptRef?.current?.prompt()
        //@ts-ignore
        promptRef?.current?.userChoice.then((choiceResult) => {
            console.log("USER CHOICE")
            if (choiceResult.outcome === 'accepted') {
                console.log('The app was added to the home screen')
            } else {
                console.log('The app was not added to the home screen')
            }
        })
    }

    return isAppInstalled ?
        null :
        <button className="a2hsButton" onClick={handleAddToHomeScreenClick} title="Installing this will allow you to use it offline">
            📦 Install as a PWA
        </button>
}

export default A2HSButton;