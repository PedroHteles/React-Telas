import React,{useState, useEffect} from  'react';

export const Page = () =>{

    useEffect(() => {
        fetch('/teste').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => console.log(data))
    })

    
    return(
        <>
            <h1>ola mundo</h1>
        </>
    )
}