import React from 'react'

export default function DaysInput({ numberOfDays, setNumberOfDays }) {

    const handleChange = e => {
        setNumberOfDays(e.target.value);
    }

    return (
        <div>
            <label>Número de Días</label>
            <input className="form-control"
                type="number"
                value={numberOfDays}
                onChange={handleChange} />
        </div>
    )
}
