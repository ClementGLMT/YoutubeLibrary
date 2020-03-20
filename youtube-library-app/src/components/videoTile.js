import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import 'semantic-ui-css/semantic.min.css';



export default class VideoTile extends React.Component {

      render() {

        return(

            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[this.props.thumbsize].url} width={this.props.data.thumbnails[this.props.thumbsize].width} height={this.props.data.thumbnails[this.props.thumbsize].height} alt={this.props.data.title} />
                <GridListTileBar title={this.props.data.title} />
            </GridListTile>

        );
      }


}