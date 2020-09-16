import React, {
    useState,
    useEffect,
    useRef,
    createRef,
    RefObject,
} from "react";

const webSocket = new WebSocket("ws://localhost:8765");
webSocket.onmessage = (event) => {
    console.log(event.data);
};
webSocket.onclose = (event) => {
    console.log("simeta");
};

webSocket.onopen = (event) => {
    console.log("seikou");
};

const WebCameraComponent: React.FC<{
    start: boolean;
    stop: boolean;
    setBlobData: any;
}> = ({ start, stop, setBlobData }) => {
    const videoRef = createRef<HTMLVideoElement>();
    const [video, setVideo] = useState<HTMLVideoElement>();
    const [check, setCheck] = useState(0);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

    useEffect(() => {
        if (videoRef.current !== null) {
            setCheck(1);
            setVideo(videoRef.current!);
        }
        console.log(videoRef.current);
    }, []);
    useEffect(() => {
        console.log("check");
        console.log(videoRef);
        if (check == 1) {
            webCameraInit().then((stream) => {
                video!.srcObject = stream!;
                setRecorder(
                    new MediaRecorder(stream!, {
                        mimeType: "video/webm",
                    })
                );
            });
        }
    }, [check]);

    useEffect(() => {
        if (recorder !== null) {
            recorder!.ondataavailable = (e) => {
                recordedChunks.push(e.data);
            };
        }
    }, [recorder]);

    useEffect(() => {
        if (start === true) {
            recorder!.start(200);
            setInterval(() => {
                webSocket.send(getCanvasData());
            }, 500);
        }
    }, [start]);

    useEffect(() => {
        if (stop === true) {
            setBlobData(getBlobData());
        }
    }, [stop]);

    const webCameraInit = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return await navigator.mediaDevices.getUserMedia({
                video: { width: 352, height: 288 },
            });
        }
    };

    const getBlobData = () => {
        const _chunks = recordedChunks.splice(0, recordedChunks.length); // バッファを空にする
        const b = new Blob(_chunks, {
            type: "video/mp4",
        });
        return b;
    };

    const getCanvasData = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = video!.offsetWidth;
        canvas.height = video!.offsetHeight;
        canvas
            .getContext("2d")!
            .drawImage(video!, 0, 0, video!.offsetWidth, video!.offsetHeight);
        const base64 = canvas.toDataURL("image/png");
        return base64;
    };

    return (
        <div className="WebCameraContainer">
            <video ref={videoRef} id="video" autoPlay></video>
        </div>
    );
};
export default WebCameraComponent;
