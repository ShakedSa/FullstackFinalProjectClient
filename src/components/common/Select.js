import React from "react";

const Select = ({ subjects }) => {
    return (
        <div>
            <select id="subject" className="classic-select" defaultValue="0">
                <option value="0" disabled>Select Subject</option>
                {subjects.map((subject, id) => {
                    return <option key={id} value={subject.id}>{subject.title}</option>
                })}
            </select>
        </div>
    )
};

export default Select;