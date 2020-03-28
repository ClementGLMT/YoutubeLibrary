import React from 'react';
import GridList from '@material-ui/core/GridList';
import VideoTile from './videoTile'
import {store} from '../store';
import './components.css';
import 'semantic-ui-css/semantic.min.css';



export default class VideoList extends React.Component {

  constructor(props) {
    super(props);
    this.data = [];
    this.update = false;
  }



  getTitleAndSubtitle(video) {


    //console.log("Video title tested: "+video.title);

    if(!video.isParsed) {

      if(video.title.length > 41) {
        //console.log('')
      console.log("Video title tested: "+video.title+" > 41");

          console.log(video.title+" get parsed");
          var title = video.title;
          var subtitle='';
          var arr = title.split(' ');
          title = '';
         // console.log(arr);
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
            isParsed: true
          }
        }
        else {
          video['subtitle'] = '';
        }
    }
    return video;
  }

  /*componentDidMount() {
    this.data = [];
  }*/

  /*shouldComponentUpdate(){
    //console.log("Should component update called");
      return this.update;
  }*/

  

  render(){
    /*if(!this.props.isDataLoaded){
      console.log("Loading tileData");
      data = tileData;
    }
    else {
      console.log("Loading propsData");
      data = this.props.data;
    }*/
    console.log("Props in videolist : "+JSON.stringify(this.props.data))
      this.data = this.props.data;

      //if(this.props.side === 'OnRight')
      console.log("Data in videoList left before treatment: "+JSON.stringify(this.data));
  
    for (let i = 0; i < this.data.length; i++) {
      if(this.data[i].subtitle === undefined){
        this.data[i]['isParsed'] = false;
        this.data[i]['subtitle'] = '';
      }
      var data2 = this.getTitleAndSubtitle(this.data[i]);
      //if(!data2.isParsed)
        //var data2 = this.getTitleAndSubtitle(this.data[i]);
      this.data[i] = data2;

    }

    this.update = true;

    /*this.data.map(tile => {
      console.log(tile);
    })*/

    if(this.props.side === 'OnLeft')
      console.log("Data in videoList Left after treatment: "+JSON.stringify(this.data));
      if(this.props.side === 'OnRight')
        console.log("%c States : in videolist right"+JSON.stringify(store.getState().ShowOnRight), 'color:blue');

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

/*<GridListTile  key={tile.id} cols={1} className={this.state.gridTileClass}>
<img src={tile.thumbnails[this.state.thumbsize].url} width={tile.thumbnails[this.state.thumbsize].width} height={tile.thumbnails[this.state.thumbsize].height} alt={tile.title} />
<GridListTileBar title={tile.title} />
</GridListTile>*/