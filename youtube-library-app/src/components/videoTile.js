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
        title: '',
        subtitle: '',
      }

      if(this.props.thumbsize === 'medium'){
        this.state.thumbClass = 'medium';
      }
      if(this.props.thumbsize === 'high'){
        this.state.thumbClass = 'high';
      }

      this.state.title = this.props.data.title;
      this.state.subtitle = '';

      if(this.props.data.title.length > 41){
        this.state.title = '';
        var arr = this.props.data.title.split(' ');
        console.log(arr);
        var i=0;
        while ((this.state.title.length + arr[i].length) < 40) {
          this.state.title = this.state.title.concat(arr[i]);
          this.state.title = this.state.title.concat(' ');
          console.log("Title = "+ this.state.title+" for i = "+i);
            i++;
        }
        console.log("break for i = "+i);

        for (let j = i; j < arr.length;j++) {
          this.state.subtitle = this.state.subtitle.concat(arr[j]);  
          this.state.subtitle = this.state.subtitle.concat(' ');
          console.log("subtitle = "+ this.state.subtitle+" for j = "+j);
       
        }
      }

    }

      render() {

/*                <Popup trigger={<Icon circular name='edit' />} flowing hoverable>
                </Popup>
                */


        return(

            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[this.props.thumbsize].url} className={this.state.thumbClass} />
                <GridListTileBar title={this.state.title} subtitle={this.state.subtitle} />
 

            </GridListTile>

        );
      }


}