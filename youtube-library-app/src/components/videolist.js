import React from 'react';
import GridList from '@material-ui/core/GridList';
import tileData from './tileData';
import VideoTile from './videoTile'
import './videolist.css';
import 'semantic-ui-css/semantic.min.css';



export default class VideoList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      gridWidth: '',
      thumbsize: '',
      gridClass: '',
      gridTileClass: '',
      rootClass: '',
    }

    if(this.props.side === 'left' ){
      this.state.rootClass = 'rootLeft'
      this.state.gridWidth = '340px';
      this.state.thumbsize = 'medium';
      this.state.gridClass = 'gridListLeft';
      this.state.gridTileClass = 'gridTileLeft';
    }

    if(this.props.side === 'right'){
      this.state.rootClass = 'rootRight'
      this.state.gridWidth =  '500px';
      this.state.thumbsize = 'high';
      this.state.gridClass = 'gridListRight';
      this.state.gridTileClass = 'gridTileRight';

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

    console.log("Data in videoList : "+JSON.stringify(data));

    return (
        <div className={this.state.rootClass} style={{width: this.state.gridWidth}}>
          <GridList cellHeight={180} className={this.state.gridClass} cols={1}>
            {data.map(tile => (
          
                <VideoTile key={tile.id} data={tile} gridTileClass= {this.state.gridTileClass} thumbsize={this.state.thumbsize}/>
            
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