import React from 'react'

const Filter = ({searchField, handleChange}) => {
    return (
        <form>
            <div>
            find countries
            <input value={searchField} onChange={handleChange} />
            </div>
        </form>
    )
}


export default Filter