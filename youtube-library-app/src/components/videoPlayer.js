import React from 'react';
import ReactPlayer from 'react-player';
import "../../node_modules/video-react/dist/video-react.css"; 
import './components.css';




export default class VideoPlayer extends React.Component {

    render() {

        console.log("Rendering Videoplayer to display ");

        return(

            <ReactPlayer className='reactPlayer' width='960px' height='540px' url={this.props.url} controls playing='true' light={this.props.thumburl}/>
        
        );
    }
}
