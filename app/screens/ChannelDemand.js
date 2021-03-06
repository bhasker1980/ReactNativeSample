import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View,StyleSheet,ScrollView, Image } from 'react-native';
import {Tile, List, ListItem ,Icon,Button, Grid, Col } from 'react-native-elements';

class ChannelDetail extends Component {
constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
   const { Client } = this.props.navigation.state.params;
  
    return fetch('http://www.vlifetech.com/getclientmediacategory/'+Client.id)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  
  render() {
  
    
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    
        
    return (
      <ScrollView>
       <List>
          <ListView dataSource={this.state.dataSource}
            renderRow={this.renderCategory.bind(this)}
          />
      </List> 
      </ScrollView>
       
    );
  }
  
  renderCategory(rowData) {
    return (
            <ListItem
              key={rowData.Mediacategory.id}
              roundAvatar
              avatar={{ uri: 'http://www.vlifetech.com/img/media/'+rowData.Mediacategory.image }}
              title={`${rowData.Mediacategory.name.toUpperCase()}`}
              onPress={() => this.onLearnMore(rowData.Mediacategory.name,rowData.Mediacategory.id,this.props.navigation.state.params.Client.id)}
            />
    );
  }
  
  onLearnMore = (MediacategoryName,MediacategoryID,ClientID) => {
   this.props.navigation.navigate('ChannelCategory',{MediacategoryName:MediacategoryName, MediacategoryID:MediacategoryID,ClientID:ClientID });
  };
  
  
 
  
  
  
}

export default ChannelDetail;
