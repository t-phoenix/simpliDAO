import React, { useState } from "react";

export default function ComponentsFromAbi(abi, index) {
    var inputCount = 0;
    const components = [];
    const [contractFunction, setContractFunction] = useState("");
    const [inputs, setInputs] = useState([]);
    const [output, setOutput] = useState("");


    for (let index = 0; index < abi.length; index++) {
        const method = abi[index];
        // console.log("ABI Method: ", method);

        if (method.type === "function") {
            //COMPONENT CODE START HERE
            const component = () => {
                

                const handleClick = async () => {
                    console.log("Inputs testing:", inputs)
                };

                function handleInputChange(event, funcIndex) {
                    const newInputs = [...inputs];
                    newInputs[funcIndex] = event.target.value;
                    setInputs(newInputs);
                }


                return (
                    <div>
                        <h2>{method.name}</h2>

                        {method.inputs.map((funcInput, funcIndex) => {
                            
                            console.log("Input COUNT:", funcInput)
                            return (
                                <div key={`${index}-${funcIndex}`}>
                                    <label>
                                        ID:{funcIndex}{funcInput.name}:  
                                        <input
                                            placeholder={funcInput.type}
                                            type="text"
                                            value={inputs[funcIndex]}
                                            onChange={(event) => handleInputChange(event, funcIndex)}
                                        />
                                    </label>
                                </div>
                            )
                        })}

                        <div>
                            <button onClick={handleClick}>Call {method.name}</button>
                        </div>
                        {/* <div>Result: {result}</div>
                        <div>Error: {error}</div> */}
                    </div>
                );

            };

            components.push(component);
        }
    }


    // for (const method of abi) {
    //     if (method.type === "function") {
    //         const component = (props) => {
    //             // const [result, setResult] = React.useState("");
    //             // const [error, setError] = React.useState("");

    //             const funcInputs = []
    //             for (const item of method.inputs) {
    //                 console.log("Input Items:", item)
    //                 funcInputs.push(<div>
    //                     <label>
    //                         {item.name}:
    //                         <input
    //                             type="text"
    //                             placeholder={item.type}
    //                             value={inputs[item]}
    //                         />
    //                     </label>
    //                 </div>)
    //             }

    //             const handleClick = async () => {
    //                 //   try {
    //                 //     const contract = new props.web3.eth.Contract(props.abi, props.address);
    //                 //     const response = await contract.methods[method.name](...props.args).call();
    //                 //     setResult(response);
    //                 //     setError("");
    //                 //   } catch (err) {
    //                 //     setResult("");
    //                 //     setError(err.message);
    //                 //   }
    //             };

    //             return (
    //                 <div>
    //                     <h2>{method.name}</h2>

    //                     <div>{funcInputs}</div>
    //                     <div>
    //                         <button onClick={handleClick}>Call {method.name}</button>
    //                     </div>
    //                     {/* <div>Result: {result}</div>
    //                     <div>Error: {error}</div> */}
    //                 </div>
    //             );
    //         };

    //         components.push(component);
    //     }
    // }

    return components;
}
