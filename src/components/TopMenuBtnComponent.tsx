import React from "react";

const TopMenuBtnComponent: React.FC<{ btnText: string; path: string }> = ({
    btnText,
    path,
}) => {
    return (
        <div className="TopMenuBtnContainer">
            <a href={path}>
                <button>{btnText}</button>
            </a>
        </div>
    );
};

export default TopMenuBtnComponent;
