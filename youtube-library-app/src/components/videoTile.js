import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './components.css';




export default class VideoTile extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        thumbClass : '',
      }
      if(this.props.thumbsize === 'medium'){
        this.state.thumbClass = 'medium';
      }
      if(this.props.thumbsize === 'high'){
        this.state.thumbClass = 'high';
      }

    }

      render() {

/*                <Popup trigger={<Icon circular name='edit' />} flowing hoverable>
                </Popup>
                */

        return(

            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[this.props.thumbsize].url} className={this.state.thumbClass} />
                <GridListTileBar title={this.props.data.title} />
 

            </GridListTile>

        );
      }


}