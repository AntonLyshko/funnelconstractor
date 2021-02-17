import React, { useEffect, useState } from 'react';

type TProps = {
    name?: string,
    max?: number,
    className?: string
}

const VariableName = (props: TProps) => {
    const { name, max, className } = props;
    const [varName, setVarName] = useState(name)



    useEffect(() => {
        if (name.length > max) {
            setVarName(name.slice(0, max) + '...');
        }
    })

    return (
        <div className={`variable-name ${className ? className : ''}`} >
            { varName}
        </div >
    )
}

export default VariableName;