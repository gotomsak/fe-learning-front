
let recorder: MediaRecorder

let recordedChunks:any = []

// let exampleSocket = new WebSocket('ws://localhost:1323')
// RTCPeerConnection()
export function webCameraInit(){
    const constrains = {video: true, audio: true}
    navigator.mediaDevices.getUserMedia(constrains)
    .then((stream:MediaStream) => {
        recorder = new MediaRecorder(stream)
        recorder.ondataavailable=(e)=>{
            if (e.data.size>0){
                recordedChunks.push(e.data)
            }
        }
    })
    .catch((err)=>{
        console.log("Video "+err)
    })
}

export function webCameraStart(){
    recorder.start()
}


export function webCameraStop(){
    recorder.stop()
}

export function webCameraDownload(){
    let blob = new Blob(recordedChunks,{ type:'video/webm' })
    let url = window.URL.createObjectURL(blob)
    recordedChunks = []
    return url
}