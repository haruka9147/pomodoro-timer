import React from 'react';
import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, Vibration, Image} from 'react-native';
import {Constants} from 'expo';

const width = Dimensions.get('window').width; //full width
const ratio = (width - 140) / 483;

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
    let min = Math.floor(this.props.count/60);
    let sec = this.props.count % 60;
    if (min.toString().length == 1) {
      min = '0' + min.toString()
    }
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
      modalVisible: false,
      count1: 1500,
      counter1: null,
      count2: 300,
      counter2: null,
      count3: 600,
      counter3: null,
      currentCounter: 1,
      custom1: 25,
      custom2: 5,
      custom3: 10,
    }
  }

  start() {
    if (this.state.currentCounter === 1 && !this.state.counter1) {
      this.state.counter1 = setInterval(() => {
        if (this.state.count1 <= 1) {
          Vibration.vibrate([500, 500, 500]);
          clearInterval(this.state.counter1)
        }
        this.setState(prevState => ({count1: prevState.count1 - 1}))
      }, 1000)
    }

    // TODO: set short break timer
    if(this.state.currentCounter === 2 && !this.state.counter2){
      this.state.counter2 = setInterval(() => {
        if (this.state.count2 <= 2) {
          Vibration.vibrate([500, 500, 500]);
          clearInterval(this.state.counter2)
        }
        this.setState(prevState => ({ count2: prevState.count2 - 1}))
      }, 1000)
    }

    // TODO: set long break timer
    if (this.state.currentCounter === 3 && !this.state.counter3) {
      this.state.counter3 = setInterval(() => {
        if (this.state.count3 <= 1) {
          Vibration.vibrate([500, 500, 500]);
          clearInterval(this.state.counter3)
        }
        this.setState(prevState => ({count3: prevState.count3 - 1}))
      }, 1000)
    }
  }

  stop() {
    if (this.state.currentCounter === 1) {
      clearInterval(this.state.counter1)
      this.setState({
        counter1: null
      })
    }

    // TODO: stop short break timer
    if(this.state.currentCounter === 2){
      clearInterval(this.state.counter2)
      this.setState({
        counter2: null
      })
    }

    // TODO: stop long break timer
    if (this.state.currentCounter === 3) {
      clearInterval(this.state.counter3)
      this.setState({
        counter3: null
      })
    }
  }

  reset() {
    // reset timer
    if (this.state.currentCounter === 1) {
      this.setState({
        count1: this.state.custom1 * 60
      })
    }

    if (this.state.currentCounter === 2) {
      this.setState({
        count1: this.state.custom2 * 60
      })
    }

    if (this.state.currentCounter === 3) {
      this.setState({
        count3: this.state.custom3 * 60
      })
    }
  }

  setCurrentCounter(current) {
    this.setState({
      currentCounter: current
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setCustomTime() {
    clearInterval(this.state.counter1)
    clearInterval(this.state.counter2)
    clearInterval(this.state.counter3)

    this.setState({
      count1: this.state.custom1 * 60,
      count2: this.state.custom2 * 60,
      count3: this.state.custom3 * 60,
      custom1: this.state.custom1,
      custom2: this.state.custom2,
      custom3: this.state.custom3,
      modalVisible: false
    })
  }

  handleCustom1 = custom1 => {
    this.setState({custom1});
  }

  handleCustom2 = custom2 => {
    this.setState({custom2});
  }

  handleCustom3 = custom3 => {
    this.setState({custom3});
  }

  render() {
    let count;
    if (this.state.currentCounter === 1) {
      count = this.state.count1;
    }
    // TODO: set short break count
    if(this.state.currentCounter === 2){
      count = this.state.count2;
    }
    // TODO: set long break count
    if (this.state.currentCounter === 3) {
      count = this.state.count3;
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.counter}>Pomodoro Timer</Text>
          <View style={styles.buttons}>
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Pomodoro'} onPress={this.setCurrentCounter.bind(this, 1)} />
            <TimerButton buttonStyle={[styles.buttonBg, styles.buttonMg]} buttonText={'Short Break'} onPress={this.setCurrentCounter.bind(this, 2)} />
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Long Break'} onPress={this.setCurrentCounter.bind(this, 3)} />
          </View>
          <Image
            source={require('./tomato.png')}
            resizeMode={'contain'}
            style={styles.image}
          />
          <Counter count={count} />
          <View style={styles.buttons}>
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Start'} onPress={this.start.bind(this)} />
            <TimerButton buttonStyle={[styles.buttonBg, styles.buttonMg]} buttonText={'Stop'} onPress={this.stop.bind(this)} />
            <TimerButton buttonStyle={styles.buttonBg} buttonText={'Reset'} onPress={this.reset.bind(this)} />
          </View>
          <TimerButton buttonStyle={styles.customBtn} buttonText={'Custom Timer'} onPress={this.setModalVisible.bind(this, true)} />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
          >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Enter Custom Timer</Text>
            <View style={styles.inputContanier}>
              <Text style={styles.inputTtl}>Pomodoro</Text>
              <TextInput 
                keyboardType="numeric"
                style={styles.input} 
                onChangeText={this.handleCustom1} 
                value={this.state.custom1}
              />
            </View>

            <View style={styles.inputContanier}>
              <Text style={styles.inputTtl}>Short Break</Text>
              <TextInput 
                keyboardType="numeric"
                style={styles.input}
                onChangeText={this.handleCustom2} 
                value={this.state.custom2} />
            </View>

            <View style={styles.inputContanier}>
              <Text style={styles.inputTtl}>Long Break</Text>
              <TextInput 
                keyboardType="numeric"
                style={styles.input}
                onChangeText={this.handleCustom3} 
                value={this.state.custom3} />
            </View>

            <TimerButton buttonStyle={styles.customBtn} buttonText={'Save'} onPress={this.setCustomTime.bind(this)} />
          </View>
        </Modal>
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
    marginBottom: 30,
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
    marginBottom: 30,
  },
  buttonMg: {
    marginHorizontal: 0,
  },
  image: {
    width: width - 140,
    height: 422 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  customBtn: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#029118'
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
    marginBottom: 20,
  },
  inputContanier: {
    width: width,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputTtl: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff'
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 20,
    padding: 5,
  }
});