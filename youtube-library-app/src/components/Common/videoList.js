import React from 'react';
import GridList from '@material-ui/core/GridList';
import VideoTile from './videoTile'
import '../styles/components.css';
import 'semantic-ui-css/semantic.min.css';



export default class VideoList extends React.Component {

  constructor(props) {
    super(props);
    this.data = [];
  }

  getTitleAndSubtitle(video) {            //Return video in the format needed by <VideoTile /> if it's not

    if(!video.isParsed) {

      if(video.title.length > 41) {

          var title = video.title;
          var subtitle='';
          var arr = title.split(' ');
          title = '';
          var i=0;
          while ((title.length + arr[i].length) < 40) {
            title = title.concat(arr[i]);
            title = title.concat(' ');
            i++;
          }
    
          for (let j = i; j < arr.length;j++) {
            subtitle = subtitle.concat(arr[j]);  
            subtitle = subtitle.concat(' ');
          }

          return {
            ...video,
            title: title,
            subtitle: subtitle,
            isParsed: true
          }
        }
        else {
          video['subtitle'] = '';
        }
    }
    return video;
  }

  

  render(){

    this.data = this.props.data;
  
    for (let i = 0; i < this.data.length; i++) {              //Check that all videos are in the good format for <VideoTile />
      if(this.data[i].subtitle === undefined){
        this.data[i]['isParsed'] = false;
        this.data[i]['subtitle'] = '';
      }
      var data2 = this.getTitleAndSubtitle(this.data[i]);
      this.data[i] = data2;
    }

    return (
      <div className={'root'+this.props.side} >
        <GridList cellHeight={180} className={'gridList'+this.props.side} cols={1}>
          {this.data.map(tile => (
          
            <VideoTile side={this.props.side} key={tile.id} data={tile} gridTileClass= {'gridTile'+this.props.side} />
            
          ))}
        </GridList>

          
      </div>
    );
  }
}