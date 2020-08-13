if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("../service-worker.js")
            .then(function() {
                console.log("ServiceWorker registration was successful");
            })
            .catch(function() {
                console.log("ServiceWorker registration failed");
            });
    });
} else {
    console.log("ServiceWorker is not supported in this browser.");
}