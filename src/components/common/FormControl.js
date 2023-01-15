import React from "react";

const FormControl = ({ inputType, inputId, content, isDate, placeHolder, isRequired,
  containToolTip, toolTipContent, onChangeCallback }) => {
  return (
    <div className="form-control">
      <input type={inputType} id={inputId} placeholder={placeHolder}
        value={isDate ? content.toISOString().split('T')[0] : content} required={isRequired}
        onChange={(e) => onChangeCallback(isDate ? new Date(e.target.value) : e.target.value)} />
      {containToolTip &&
        <div className="tooltip">
          <span className="tooltiptext">{toolTipContent}</span>
        </div>
      }
    </div>
  );

}

export default FormControl;
