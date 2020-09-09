export class webCameraManager {
    recordedChunks: Blob[];
    recorder?: MediaRecorder;
    blobData: Blob;
    chuncBlobData: Blob;
    device: MediaDevices;
    streamData?: MediaStream;
    video: HTMLVideoElement;
    divCanvas: HTMLElement | null;
    constrains: {};
    divVideo: HTMLElement | null;
    constructor() {
        this.recordedChunks = [];
        this.blobData = new Blob([], { type: "video/mp4" });
        this.chuncBlobData = new Blob([], { type: "video/mp4" });
        this.device = navigator.mediaDevices;
        this.video = document.createElement("video");
        this.divCanvas = document.getElementById("canvas");
        this.divVideo = document.getElementById("video");
        this.constrains = { video: { width: 352, height: 288 } };
    }

    webCameraInit() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.device
                .getUserMedia(this.constrains)
                .then((stream: MediaStream) => {
                    let options = {
                        videoBitesPerSecond: 2500000,
                        mimeType: "video/webm",
                    };

                    console.log(stream.getTrackById);
                    this.streamData = stream;
                    this.video.srcObject = stream;
                    document.body.insertBefore(this.video, this.divVideo);
                    this.video.play();
                    console.log(stream);
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
        this.recorder?.start(200);
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

    getCanvasData() {
        const canvas = document.createElement("canvas");
        canvas.width = this.video.offsetWidth;
        canvas.height = this.video.offsetHeight;
        canvas
            .getContext("2d")
            ?.drawImage(
                this.video,
                0,
                0,
                this.video.offsetWidth,
                this.video.offsetHeight
            );
        const base64 = canvas.toDataURL("image/png");
        return base64;
    }

    getBlobChunkData() {
        const _chunks: Blob[] = this.recordedChunks.splice(
            0,
            this.recordedChunks.length
        ); // バッファを空にする
        this.blobData = new Blob([this.blobData].concat(_chunks), {
            type: "video/mp4",
        });
        this.chuncBlobData = new Blob(_chunks, {
            type: "video/mp4",
        });
        return this.chuncBlobData;
    }
    getBlobData() {
        console.log("getBlob");
        const _chunks = this.recordedChunks.splice(
            0,
            this.recordedChunks.length
        ); // バッファを空にする
        console.log(this.recordedChunks.length);
        this.blobData = new Blob([this.blobData].concat(_chunks), {
            type: "video/mp4",
        });
        return this.blobData;
    }
}
