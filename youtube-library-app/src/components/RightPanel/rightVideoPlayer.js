import React from 'react';
import VideoPlayer from './videoPlayer';
import { Header } from 'semantic-ui-react';
import '../styles/components.css';
import 'semantic-ui-css/semantic.min.css';




export default class RightVideoPlayer extends React.Component {



    render()  {

        var VideoName ;
        var url;
        var thumburl;

        var video = this.props.video;

        if(video === undefined) {                               //Need a initialization video
            VideoName = '';
            url = 'https://www.youtube.com/watch?v=txkzJVZhVYc';
            thumburl = 'https://image.noelshack.com/fichiers/2020/12/5/1584732752-yagami-light.jpg';
        }
        else {                                                  //Load video from props if we got one (Title, url and thumbnail url)
            VideoName = video.title;
            url = 'https://www.youtube.com/watch?v='+video.id;
            thumburl = video.thumbnails.high.url;
        }


        return(
                <div className='videoContainer'>
                    <Header > {VideoName} </Header>
                    <VideoPlayer className = 'videoPlayer' url={url} thumburl={thumburl}/>
                </div>
        );

    }
}