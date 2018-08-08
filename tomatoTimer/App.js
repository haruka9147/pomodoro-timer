import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Vibration} from 'react-native';
import {Constants} from 'expo';

const width = Dimensions.get('window').width; //full width

class TimerButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={this.props.buttonStyle} onPress={this.props.onPress}>
        <Text style={styles.button}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    )
  }
}

class Counter extends React.Component {
  render() {
    const min = Math.floor(this.props.count/60);
    let sec = this.props.count % 60;
    if (sec.toString().length == 1) {
      sec = '0' + sec.toString()
    }
    return (
      <Text style={styles.counter}>{min}:{sec}</Text>
    )
  }
}

class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count1: 10,
      counter1: null,
      count2: 300,
      counter2: null,
      currentCounter: 1,
    }
  }

  start() {
    if (this.state.currentCounter === 1) {
      this.state.counter1 = setInterval(() => {
        if (this.state.count1 <= 1) {
          Vibration.vibrate([500, 500, 500]);
          clearInterval(this.state.counter1)
        }
        this.setState(prevState => ({count1: prevState.count1 - 1}))
      }, 1000)
    }

    // TODO: set short break timer

    // TODO: set long break timer
  }

  stop() {
    if (this.state.currentCounter === 1) {
      clearInterval(this.state.counter1)
    }

    // TODO: stop short break timer

    // TODO: stop long break timer
  }

  reset() {
    // reset timer
    if (this.state.currentCounter === 1) {
      this.setState({
        count1: 10
      })
    }
  }

  setCurrentCounter(current) {
    this.setState({
      currentCounter: current
    })
  }

  render() {
    let count;
    if (this.state.currentCounter === 1) {
      count = this.state.count1;
    }
    // TODO: set short break count

    // TODO: set long break count
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttons}>
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Pomodoro'} onPress={this.setCurrentCounter.bind(this, 1)} />
            <TimerButton buttonStyle={[styles.buttonBg, styles.buttonMg]} buttonText={'Short Break'} onPress={this.setCurrentCounter.bind(this, 2)} />
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Long Break'} onPress={this.setCurrentCounter.bind(this, 3)} />
          </View>
          <Counter count={count} />
          <View style={styles.buttons}>
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Start'} onPress={this.start.bind(this)} />
            <TimerButton buttonStyle={[styles.buttonBg, styles.buttonMg]} buttonText={'Stop'} onPress={this.stop.bind(this)} />
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Reset'} onPress={this.reset.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <CountDownTimer />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc5555',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: width,
    marginBottom: 50,
  },
  button: {
    color: '#fc5555',
    fontSize: 16,
  },
  buttonBg: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  counter: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonMg: {
    marginHorizontal: 0,
  }
});