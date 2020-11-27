import React from 'react'

const Filter = ({searchField, handleChange}) => {
    return (
        <form>
            <div>
            filter: <input value={searchField} onChange={handleChange} />
            </div>
        </form>
    )
}


export default Filter