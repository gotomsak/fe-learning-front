import React, { useState, useEffect } from "react";
import { BtoFtoC, SonConc } from "../apis/backendAPI/interfaces";

const ConcentrationViewComponent: React.FC<{
    concData: BtoFtoC | SonConc | null;
    concData1: BtoFtoC | null;
    concData2: SonConc | null;
}> = ({ concData, concData1, concData2 }) => {
    const [concView, setConcView] = useState("");
    const [concView1, setConcView1] = useState("NonSelectMethod1");
    const [concView2, setConcView2] = useState("NonSelectMethod2");
    const isBtoFtoC = (arg: any): arg is BtoFtoC => {
        return (
            arg !== null &&
            arg.c3 !== null &&
            arg.c3 !== undefined &&
            arg.c3.length !== 0
        );
    };
    const isSonConc = (arg: any): arg is SonConc => {
        return (
            arg !== null &&
            arg.concentration !== null &&
            arg.concentration !== undefined &&
            arg.concentration.length !== 0
        );
    };
    useEffect(() => {
        console.log(isBtoFtoC(concData1));
        if (isBtoFtoC(concData1)) {
            setConcView1(concData1.c3[concData1.c3.length - 1].toString());
        }
    }, [concData1]);

    useEffect(() => {
        console.log(isSonConc(concData2));
        if (isSonConc(concData2)) {
            setConcView2(
                concData2.concentration[
                    concData2.concentration.length - 1
                ].toString()
            );
        }
    }, [concData2]);

    return (
        <div className="ConcentrationViewContainer">
            <h3>集中度Method1: {concView1}</h3>
            <h3>集中度Method2: {concView2}</h3>
        </div>
    );
};

export default ConcentrationViewComponent;
