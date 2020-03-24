import React from 'react';
import VideoPlayer from './videoPlayer';
import { Header } from 'semantic-ui-react';
import './components.css';
import 'semantic-ui-css/semantic.min.css';




export default class RightVideoPlayer extends React.Component {



    render()  {
        var VideoName;
        var url;
        var thumburl;

        if(this.props.VideoName === undefined) {
            VideoName = 'Okonami no suzuki';
        }
        else {
            VideoName = this.props.VideoName;
        }


        if(this.props.url === undefined) {
            url = 'https://www.youtube.com/watch?v=txkzJVZhVYc';
        }
        else {
            url = this.props.url;
        }

        
        if(this.props.thumburl === undefined) {
            thumburl = 'https://image.noelshack.com/fichiers/2020/12/5/1584732752-yagami-light.jpg';
        }
        else {
            thumburl = this.props.thumburl;
        }


        return(
            <div className='rightPanel'>
                <div className='videoContainer'>
                    <Header > {VideoName} </Header>
                    <VideoPlayer className = 'videoPlayer' url={url} thumburl={thumburl}/>
                </div>
            </div>
        );

    }
}