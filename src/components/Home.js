import AddNote from './AddNote';
import Notes from './Notes';
import React from 'react';


export const Home = (props) => {
    const {showAlert}=props;

    return (

        <> 
                        

            
        

            <Notes showAlert={showAlert}/>
        
        
         </>
    )
}