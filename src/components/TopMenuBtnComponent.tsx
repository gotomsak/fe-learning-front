import React from "react";
import { Button } from "@material-ui/core";

const TopMenuBtnComponent: React.FC<{
    btnText: string;
    path?: string;
    event?: any;
}> = ({ btnText, path, event }) => {
    return (
        <div className="TopMenuBtnContainer">
            <a href={path}>
                <Button onClick={event} color="secondary">
                    {btnText}
                </Button>
            </a>
        </div>
    );
};

export default TopMenuBtnComponent;
