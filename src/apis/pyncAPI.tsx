import axios from "axios";

console.log(process.env.REACT_APP_NEXTCLOUD_GET);

export interface UploadNextCloud {
    upload_path: string;
}

export const pync = (uploadNextCloud: UploadNextCloud) => {
    return axios
        .post("/", uploadNextCloud, {
            baseURL: process.env.REACT_APP_NEXTCLOUD_POST,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin":
                    process.env.REACT_APP_NEXTCLOUD_POST,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res;
        });
};
