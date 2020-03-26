import React from 'react';
import {Header} from 'semantic-ui-react'




export default class WelcomeRigthPanel extends React.Component {

render() {
    return (
        <div className='welcome'>
            <h1 className='title'> Welcome to your Youtube library manager !</h1>
            <h2 className='title2'> Here you can :</h2>
            <ul className = 'list'>
                <li>
                    Search videos on Youtube (then play them, or add them to your library)
                </li>
                <li>
                    Delete a video from your library
                </li>
                <li>
                    Rename a video from your library 
                </li>
                <li>
                    Play a video from your library 
                </li>
            </ul>

            <h2>Have fun !</h2>


        </div>
    )
}

    
}