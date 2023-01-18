import React from "react";
import { useState } from "react";
import FormControl from "./FormControl";
import Button from "./Button";
import { stringNullOrEmpty, validateEmail } from "../../assets/validations";

const Modal = ({ shouldEdit, treatment, errorMessage, setDisplay, save }) => {

    const [info, setInfo] = useState(treatment ? treatment.treatmentInformation : "");
    const [date, setDate] = useState(treatment ? treatment.date : new Date());
    const [workerEmail, setWorkerEmail] = useState(treatment ? treatment.workerEmail : "");
    const [carNumber, setCarNumber] = useState(treatment ? treatment.carNumber : "");

    const closeModal = () => {
        setDisplay(false);
    }

    const saveTreatment = () => {
        if (validateEmail(workerEmail) && !stringNullOrEmpty(info) && !stringNullOrEmpty(date) && !stringNullOrEmpty(carNumber) && carNumber.length === 8 && !isNaN(carNumber)) {
            let number;
            if (treatment) {
                number = treatment.treatmentNumber;
            } else {
                number = 2000; // random number, will be assign in the backend.
            }
            const newTreatment = {
                "treatmentNumber": number,
                "treatmentInformation": info,
                "date": date,
                "workerEmail": workerEmail,
                "carNumber": carNumber
            };
            save(newTreatment);
            closeModal();
        }
    }

    return (
        <>
            <div id="modal" className="modal">
                <div className="modal-content" >
                    {shouldEdit &&
                        <form style={{ alignItems: "center" }}>
                            <FormControl inputType="text" inputId="treatmentInformation" placeHolder="Treatment Information"
                                content={info} isRequired={false} containToolTip={false} onChangeCallback={setInfo} />
                            <FormControl inputType="date" inputId="date" placeHolder="Treatment Date" content={new Date(date)}
                                isDate={true} isRequired={false} containToolTip={false} onChangeCallback={setDate} />
                            <FormControl inputType="email" inputId="workerEmail" placeHolder="Worker Email" content={workerEmail} isRequired={false}
                                containToolTip={false} onChangeCallback={setWorkerEmail} />
                            <FormControl inputType="text" inputId="carNumber" placeHolder="Car Number" content={carNumber} isRequired={false}
                                containToolTip={false} onChangeCallback={setCarNumber} />
                            <Button className="btn" content="Save" onClickCallback={saveTreatment} />
                        </form>}

                    {!shouldEdit &&
                        <p className="text">{errorMessage}</p>}

                    <Button className="reverse-btn" content="Close" onClickCallback={closeModal} />
                </div>
            </div>
        </>
    );
};

export default Modal;