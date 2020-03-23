import React from 'react';
import GridList from '@material-ui/core/GridList';
import tileData from './tileData';
import VideoTile from './videoTile'
import './components.css';
import 'semantic-ui-css/semantic.min.css';



export default class VideoList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    }
  }

  getTitleAndSubtitle(title) {

    var subtitle='';
    var fullTitle = title;
    if(title.length > 41){
      var arr = title.split(' ');
      title = '';
      console.log(arr);
      var i=0;
      while ((title.length + arr[i].length) < 40) {
        title = title.concat(arr[i]);
        title = title.concat(' ');
        console.log("Title = "+ title+" for i = "+i);
          i++;
      }
      console.log("break for i = "+i);

      for (let j = i; j < arr.length;j++) {
        subtitle = subtitle.concat(arr[j]);  
        subtitle = subtitle.concat(' ');
        console.log("subtitle = "+ subtitle+" for j = "+j);
      }
      return {
        title: title,
        subtitle: subtitle
      }
    }
    return {
      title: fullTitle,
      subtitle: ''
    }

  }

  

  render(){

    var data;
    if(this.props.isDataLoaded === 0){
      console.log("Loading tileData");
      data = tileData;
    }
    else {
      console.log("Loading propsData");
      data = this.props.data;
    }

    console.log('Title : '+data.title);
    var data2 = [];

    for (let i = 0; i < data.length; i++) {
      data2[i] = this.getTitleAndSubtitle(data[i].title);
      data[i].title = data2[i].title;
      data[i].subtitle = data2[i].subtitle;      
    }


    console.log("Data in videoList : "+JSON.stringify(data));

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