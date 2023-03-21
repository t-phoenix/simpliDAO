import React from "react";
import { useLocation } from "react-router-dom";
import Delegate from "../components/token/Delegate";
import Balance from "../components/token/Balance";
import StaticData from "../components/token/StaticData";
import TransferOwner from "../components/token/TransferOwner";

export default function TokenScreen() {

    const { state } = useLocation();
    console.log("token State:", state);




    return (
        <div style={{ height: '100%', width: '100%' }}>
            <h1> TokenScreen</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <StaticData token={state} />
                <TransferOwner token={state} />
                <Delegate token={state} />
                <Balance token={state} />


            </div>

        </div>
    )
}