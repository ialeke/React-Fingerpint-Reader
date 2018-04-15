const Fingerprint = window.Fingerprint

const FingerprintSdk = (function () {
    function FingerprintSdk() {
        this.sdk = new Fingerprint.WebApi()

        this.sdk.onSamplesAcquired = function(s) {
            samplesAcquired(s)
        }
    }

    FingerprintSdk.prototype.getDeviceList = function () { return this.sdk.enumerateDevices() }

    FingerprintSdk.prototype.startCapture = function () {
        this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(function () {
            return console.log('Capturando huella')
        }, function (error) {
            return console.log('Error al comenzar la captura de huella')
        })
    }

    FingerprintSdk.prototype.stopCapture = function () {
        this.sdk.stopAcquisition().then(function () {
            return console.log('Captura de huella detenida')
        }, function (error) {
            return console.log('Error al detener la captura de huella')
        })
    }

    return FingerprintSdk
})()

function samplesAcquired(s){   
    // if(currentFormat === Fingerprint.SampleFormat.PngImage){   
    // // If sample acquired format is PNG- perform following call on object received 
    // // Get samples from the object - get 0th element of samples as base 64 encoded PNG image         
        localStorage.setItem("imageSrc", "");                
        let samples = JSON.parse(s.samples);            
        localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
        let vDiv = document.getElementById('imagediv');
        vDiv.innerHTML = "";
        let image = document.createElement("img");
        image.id = "image";
        image.src = localStorage.getItem("imageSrc");
        vDiv.appendChild(image);
    // }
}

module.exports = { FingerprintSdk, Fingerprint }