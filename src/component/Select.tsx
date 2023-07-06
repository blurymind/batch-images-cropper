import {useEffect, useRef, useState} from "react";
interface SelectProps {
    selectItems: Array<{name:string, value: null|{width: number, height: number}}>
    selectId: string
    onSelect: (p:any)=>void
}
const Select = ({ selectId = "select", selectItems, onSelect }: SelectProps) => {
    const handleOnSelect = (e: any) =>{
        onSelect(selectItems[e?.target?.value]?.value)
    }
    return (
        <select name={selectId} id={selectId} onChange={handleOnSelect}>
            {selectItems.map((item: any, index)=>(<option value={index} key={item?.name + index}>{item?.name}</option>))}
        </select>
    )
}

export default Select;