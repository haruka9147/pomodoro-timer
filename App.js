import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Constants } from "expo";

class Counter extends Component {
  state = {
    count: 60
  };

  componentDidMount() {
    this.interval = setInterval(this.incrementCount, 1000);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  incrementCount = () => {
    console.log("incrementing!");
    this.setState(prevState => ({ count: prevState.count - 1 }));
  };

  render() {
    return <Text style={styles.counterText}>{this.state.count}</Text>;
  }
}

export default class App extends React.Component {
  state = { showCounter: true };

  toggleCounter = () => {
    this.setState(prevState => ({
      showCounter: !prevState.showCounter
    }));
  };

  render() {
    if (this.state.showCounter) {
      return (
        <View style={styles.container}>
          <View style={styles.button}>
            <Button title="Pomodoro" onPress={this.toggleCounter} />
            <Button title="Short Break" onPress={this.toggleCounter} />
            <Button title="Long Break" onPress={this.toggleCounter} />
          </View>
          <View style={styles.counterText}>
            <Counter />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.button}>
            <Button title="Pomodoro" onPress={this.toggleCounter} />
            <Button title="Short Break" onPress={this.toggleCounter} />
            <Button title="Long Break" onPress={this.toggleCounter} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    flexDirection: "row"
  },
  counterText: {
    fontSize: 100
  }
});
