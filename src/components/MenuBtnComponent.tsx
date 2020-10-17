import React from "react";
import { Button } from "@material-ui/core";

const TopMenuBtnComponent: React.FC<{
    btnText: string;
    path?: string;
    event?: any;
}> = ({ btnText, path, event }) => {
    return (
        <div className="TopMenuBtnContainer">
            <p>
                <a href={path}>
                    <Button onClick={event} color="secondary">
                        {btnText}
                    </Button>
                </a>
            </p>
        </div>
    );
};

export default TopMenuBtnComponent;
