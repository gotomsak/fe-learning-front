import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "./ReadyViewComponent.css";
const ReadyViewComponent: React.FC<{
    setStartCheck: any;
    readyViewText: any;
}> = ({ setStartCheck, readyViewText }) => {
    const buttonClick = () => {
        setStartCheck(true);
    };
    return <div className="ReadyViewContainer">{readyViewText()}</div>;
};

export default ReadyViewComponent;
