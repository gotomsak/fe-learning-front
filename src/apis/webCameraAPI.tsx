export class webCameraManager {
    recordedChunks: Blob[];
    recorder?: MediaRecorder;
    blobData: Blob;
    device: MediaDevices;
    streamData?: MediaStream;
    constructor() {
        this.recordedChunks = [];
        this.blobData = new Blob([], { type: "video/webm" });
        this.device = navigator.mediaDevices;
    }

    webCameraInit() {
        const constrains = { video: { width: 1280, height: 720 } };
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.device
                .getUserMedia(constrains)
                .then((stream: MediaStream) => {
                    let options = {
                        videoBitesPerSecond: 2500000,
                        mimeType: "video/webm",
                    };
                    console.log(stream.getTrackById);
                    this.streamData = stream;
                    this.recorder = new MediaRecorder(stream, options);
                    this.recorder.ondataavailable = (e) => {
                        this.recordedChunks.push(e.data);
                    };
                })
                .catch((err) => {
                    console.log("Video " + err);
                });
        }
    }
    webCameraStart() {
        this.recorder?.start();
        console.log("recorder started");
    }

    webCameraStop() {
        if (this.streamData !== undefined) {
            this.streamData.getVideoTracks()[0].stop();
        }
        this.recorder?.stop();
    }
    // flush() {
    //     if (this.streamData !== undefined) {
    //         this.streamData.getVideoTracks()[0].stop();
    //     }
    //     this.recorder?.stop();
    // }
    getBlobData() {
        console.log("getBlob");
        const _chunks = this.recordedChunks.splice(
            0,
            this.recordedChunks.length
        ); // バッファを空にする
        this.blobData = new Blob([this.blobData].concat(_chunks), {
            type: "video/mp4",
        });
        console.log(this.blobData);
        return this.blobData;
    }
}
