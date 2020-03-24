import React from 'react';
import GridList from '@material-ui/core/GridList';
import tileData from './tileData';
import VideoTile from './videoTile'
import {store} from '../store';
import { Icon, Header, Button, Image, Modal, Input } from 'semantic-ui-react';
import {modalAction} from '../actions';
import './components.css';
import 'semantic-ui-css/semantic.min.css';



export default class VideoList extends React.Component {



  getTitleAndSubtitle(video) {


  
      if(video.title.length > 41) {

        if(video.isParsed === 0){

          var title = video.title;
          var subtitle='';
          var fullTitle = title;
          var arr = title.split(' ');
          title = '';
          //console.log(arr);
          var i=0;
          while ((title.length + arr[i].length) < 40) {
            title = title.concat(arr[i]);
            title = title.concat(' ');
            //console.log("Title = "+ title+" for i = "+i);
              i++;
          }
          //console.log("break for i = "+i);
    
          for (let j = i; j < arr.length;j++) {
            subtitle = subtitle.concat(arr[j]);  
            subtitle = subtitle.concat(' ');
            //console.log("subtitle = "+ subtitle+" for j = "+j);
          }
          return {
            ...video,
            title: title,
            subtitle: subtitle,
            isParsed: 1
          }
        }

      }
    return video;
  }


  

  render(){

    var data;
    if(!this.props.isDataLoaded){
      console.log("Loading tileData");
      data = tileData;
    }
    else {
      console.log("Loading propsData");
      data = this.props.data;
    }
    if(this.props.side === 'OnLeft'){
      data = this.props.data;
      console.log("Loading props on left: "+JSON.stringify(data));
    }


  //console.log('Videos : '+JSON.stringify(data));


    for (let i = 0; i < data.length; i++) {

      var data2 = this.getTitleAndSubtitle(data[i]);
     // console.log("data2: "+JSON.stringify(data2));
      data[i] = data2;
    }


    //console.log("Data in videoList : "+JSON.stringify(data));

    return (
        <div className={'root'+this.props.side} >
          <GridList cellHeight={180} className={'gridList'+this.props.side} cols={1}>
            {data.map(tile => (
          
                <VideoTile side={this.props.side} key={tile.id} data={tile} gridTileClass= {'gridTile'+this.props.side} />
            
            ))}
          </GridList>

          
        </div>
    );
  }

}

/*<GridListTile  key={tile.id} cols={1} className={this.state.gridTileClass}>
<img src={tile.thumbnails[this.state.thumbsize].url} width={tile.thumbnails[this.state.thumbsize].width} height={tile.thumbnails[this.state.thumbsize].height} alt={tile.title} />
<GridListTileBar title={tile.title} />
</GridListTile>*/