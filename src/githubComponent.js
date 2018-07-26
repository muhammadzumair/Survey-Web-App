import React, { Componenet } from 'react';
export let InputField = (props) => {
    return (
        <input value={props.value} onChange={props.onChange} onKeyPress={props.onKeyPress} />
    )
};

export let List  = (props) =>{
    return(
        <ul>
            {
                props.array.map(data=>{
                    return(
                        <li>
                            
                        </li>
                    )
                })
            }
        </ul>
    );
}