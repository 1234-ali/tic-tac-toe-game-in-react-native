import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

class App extends Component {

  constructor (props) {
    super (props);
      this.state = {
        gemState: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        currentPlayer: 1
      }
  };

  initializeGame = () => {
    this.setState({
      gemState : [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    });
  };

  componentDidMount() {
    this.initializeGame();
  };

  getWinner = () => {
    var NUM_TILES = 3;
    var arr = this.state.gemState;
    var sum;

    //check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //check cols
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //diagnols
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //There are no winners
    return 0;
  };

  onTilePress = (row, col) => {
    //Don,t allow tiles to change
    var value = this.state.gemState[row][col];
    if (value !== 0) { return; }

    //Grab current player
    var currentPlayer = this.state.currentPlayer;

    //set the correct tile
    var arr = this.state.gemState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gemState: arr});

    //switch to other player
    var nextPlayer = (this.state.currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //check for winner
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Player 1 is winner');
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert('Player 2 is winner');
      this.initializeGame();
    }
  };

  onNewGamePress = () => {
    this.initializeGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gemState[row][col];
    switch(value) {
      case 1: return <MaterialCommunityIcons name='close' style={styles.tileX} />;
      case -1: return <MaterialCommunityIcons name='circle-outline' style={styles.tileO} />;
      default: <View />;
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={{ ...styles.box, borderLeftWidth: 0, borderTopWidth: 0 }}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={{ ...styles.box, borderTopWidth: 0 }}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={{ ...styles.box, borderRightWidth: 0, borderTopWidth: 0}}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={{ ...styles.box, borderLeftWidth: 0 }}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.box}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={{ ...styles.box, borderRightWidth: 0 }}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={{ ...styles.box, borderLeftWidth: 0, borderBottomWidth: 0 }}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={{ ...styles.box,  borderBottomWidth: 0 }}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={{ ...styles.box,  borderBottomWidth: 0, borderRightWidth: 0 }}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50 }}>
          <Button title='New Game' onPress={this.onNewGamePress} />
        </View>
      </View>
    );
  }
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tileX: {
    color: 'red',
    fontSize: 60
  },
  tileO: {
    color: 'green',
    fontSize: 60,
    
  }
});

export default App;
