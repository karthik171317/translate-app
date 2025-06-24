import { useState, useContext } from "react";


function Select({className, value, options, onChange}){
    return (<>
        <select className={className} value={value} onChange={(e) => {onChange(e)}}>
            {options.map((ele,inx) => { 
                return <option key={inx} value={ele.value}> {ele.label} </option> })}
        </select>
    </>)
}

export default Select;