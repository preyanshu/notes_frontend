import AddNote from './AddNote';
import Notes from './Notes';
import React from 'react';


export const Home = (props) => {
    const {showAlert}=props;

    return (

        <> 
        <div className="flex1">
            
       <AddNote showAlert={showAlert}></AddNote>
 <div style={{height: 300 + 'px',width : 300+"px"}}>
<lottie-player src="https://lottie.host/b6046211-5996-477a-9254-69e90a10bcf3/hvVoDXn9hw.json"  speed="1" style={{height: 300+'px',width : 300+"px"}} direction="1" mode="normal" loop autoplay></lottie-player>
</div>     </div>                

            
        

            <Notes showAlert={showAlert}/>
        
        
         </>
    )
}