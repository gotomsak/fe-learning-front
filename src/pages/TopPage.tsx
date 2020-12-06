import React, { useState, useEffect, useRef } from "react";
import MenuBtnComponent from "../components/MenuBtnComponent";
import { useHistory } from "react-router";
import { checkSession } from "../apis/backendAPI/userAuth";
import ErrorViewComponent from "../components/ErrorViewComponent";
import { signout } from "../apis/backendAPI/userAuth";
import "./TopPage.css";

function TopPage() {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        checkSession()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                history.push("/signin");
            });
    }, []);
    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage]);

    const SignoutEvent = () => {
        signout()
            .then((res) => {
                history.push("/signin");
                setErrorMessage("ok");
            })
            .catch((err) => {
                setErrorMessage(err.data);
            });
    };
    const StartLearning = () => {
        history.push("/learning");
    };
    const Frequency = () => {
        history.push("/frequency");
    };
    const Manual = () => {
        history.push("/manual");
    };

    return (
        <div className="TopPageContainer">
            <h1>fe-learning</h1>
            <div className="TopMenu">
                <h2>メニュー</h2>
                <MenuBtnComponent
                    btnText="学習を始める"
                    event={StartLearning}
                ></MenuBtnComponent>
                <MenuBtnComponent
                    btnText="頻度初期化"
                    event={Frequency}
                ></MenuBtnComponent>
                <MenuBtnComponent
                    btnText="使い方"
                    event={Manual}
                ></MenuBtnComponent>
                <MenuBtnComponent
                    btnText={"サインアウト"}
                    event={SignoutEvent}
                ></MenuBtnComponent>
            </div>

            {/* <SignoutBtnComponent setErrorMessage={setErrorMessage} />
            {errorMessage !== "" && (
                <ErrorViewComponent errMessage={errorMessage} />
            )} */}
        </div>
    );
}

export default TopPage;
