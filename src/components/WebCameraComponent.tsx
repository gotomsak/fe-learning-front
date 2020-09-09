import React, { useState, useEffect } from "react";
import { deflate } from "zlib";

const WebCameraComponent: React.FC = () => {
    return (
        <div className="WebCameraContainer">
            <div id="video"></div>
        </div>
    );
};
export default WebCameraComponent;
