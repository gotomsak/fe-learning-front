import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { SaveQuestionnairePost } from "../apis/backendAPI/interfaces";
import store from "..";
import { range } from "../utils/utils";
import RadioComponent from "../components/RadioComponent";
import saveQuestionnaire from "../apis/backendAPI/saveQuestionnaire";
import TopPage from "./TopPage";
import { useHistory } from "react-router";
import { send } from "process";

function QuestionnairePage() {
    const [concentration, setConcentration] = useState(0);
    const [whileDoing, setWhileDoing] = useState(false);
    const [cheating, setCheating] = useState(false);
    const [nonsense, setNonsense] = useState(false);
    const history = useHistory();

    const rangeConcentrationRadio = range(1, 10);
    const concentrationRadio: any = [];
    rangeConcentrationRadio.forEach((n) => {
        concentrationRadio.push({
            text: n.toString(),
            value: n.toString(),
        });
    });

    const boolRadio: any = [
        { text: "はい", value: true },
        { text: "いいえ", value: false },
    ];

    const setQuestionnaireData = (): SaveQuestionnairePost => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            answer_result_section_id: store.getState().ansResultSectionIDState,
            concentration: concentration,
            while_doing: whileDoing,
            cheating: cheating,
            nonsense: nonsense,
        };
    };

    const sendButton = () => {
        saveQuestionnaire(setQuestionnaireData()).catch((err) => {
            console.log(err);
        });
    };
    const nextPage = () => {
        sendButton();
        history.push("/learning");
    };
    const topPage = () => {
        sendButton();
        history.push("/");
    };

    useEffect(() => {
        console.log(concentration);
    }, [concentration]);

    return (
        <div className="QuestionnairePageContainer">
            <h1>アンケートページ</h1>
            <h2>自己評価をお願いします</h2>
            <br />
            <div>
                <h3>どの程度集中できましたか？</h3>
                <RadioComponent
                    radioData={concentrationRadio}
                    name="concentration"
                    setValue={setConcentration}
                ></RadioComponent>
            </div>
            <br />
            <div>
                <h3>カンニングをしましたか？</h3>
                <RadioComponent
                    radioData={boolRadio}
                    name="cheating"
                    setValue={setCheating}
                ></RadioComponent>
            </div>
            <br />
            <div>
                <h3>デタラメ（ランダム，運任せ）で解答しましたか？</h3>
                <RadioComponent
                    radioData={boolRadio}
                    name="nonsense"
                    setValue={setNonsense}
                ></RadioComponent>
            </div>
            <br />
            <div>
                <h3>（ゲーム，動画視聴等）しながら解答をしましたか？</h3>
                <RadioComponent
                    radioData={boolRadio}
                    name="while_doing"
                    setValue={setWhileDoing}
                ></RadioComponent>
            </div>
            <br />
            <button onClick={nextPage}>続ける</button>
            <button onClick={topPage}>辞める</button>
        </div>
    );
}

export default QuestionnairePage;
