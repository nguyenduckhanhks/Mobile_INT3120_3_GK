import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Alert } from 'react-native';
import Count from './Count.js';

const initState = {
  work: {
    minutes: '0',
    seconds: '0'
  },
  break: {
    minutes: '0',
    seconds: '0'
  },
  seconds: 0,
  type: 'work'
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      work: {
        minutes: '0',
        seconds: '0'
      },
      break: {
        minutes: '0',
        seconds: '0'
      },
      seconds: 0,
      type: 'work'
    }
  }
  onChangebreak = (text, type) => {
    let stateBreak = this.state.break
    if(text == '') text = '0'
    stateBreak[type] = text
    this.setState({
      break: stateBreak
    })
  }
  onChangework = (text, type) => {
    let stateWork = this.state.work
    if(text == '') text = '0'
    stateWork[type] = text
    this.setState({
      work: stateWork
    })
  }
  reset = () => {
    this.setState(initState)
    clearInterval(this.interval)
  }
  start = () => {
    this.setState(prevState => ({
      seconds: parseInt(prevState.work.minutes) * 60 + parseInt(prevState.work.seconds),
      type: 'work'
    }))
    this.interval = setInterval(this.run, 1000)
  }
  run = () => {
    let state = this.state
    if(state.seconds <= 0) {
      if(state.type == 'work') {
        this.setState({
          seconds: parseInt(state.break.minutes) * 60 + parseInt(state.break.seconds),
          type: 'break'
        })
        return
      }

      if(state.type == 'break') {
        clearInterval(this.interval)
        return
      }
    }
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }))
  }
  render() {
    let state = this.state
    return (
      <ScrollView style={styles.fill}>
        <View>
          <Text style={styles.title}>{state.type == 'work' ? 'Work Time' : 'Break Time'}</Text>

          <Count seconds={parseInt(state.seconds % 60)} minutes={parseInt(state.seconds / 60)}/>

          {/* work time */}
          <View style={[styles.flex1, styles.mtop20]}>
            <Text style={[styles.normalText, styles.flex1]}>Work Time:</Text>
            <View style={styles.flex1}>
              <Text style={styles.normalText}>Mins:</Text>
              <TextInput
                style={[styles.textInput, styles.normalText]}
                onChangeText={text => this.onChangework(text, 'minutes')}
                value={state.work.minutes}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.flex1}>
              <Text style={styles.normalText}>Secs:</Text>
              <TextInput
                style={[styles.textInput, styles.normalText]}
                onChangeText={text => this.onChangework(text, 'seconds')}
                value={state.work.seconds}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* break time */}
          <View style={[styles.flex1, styles.mtop20]}>
            <Text style={[styles.normalText, styles.flex1]}>Break Time:</Text>
            <View style={styles.flex1}>
              <Text style={styles.normalText}>Mins:</Text>
              <TextInput
                style={[styles.textInput, styles.normalText]}
                onChangeText={text => this.onChangebreak(text, 'minutes')}
                value={state.break.minutes}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.flex1}>
              <Text style={styles.normalText}>Secs:</Text>
              <TextInput
                style={[styles.textInput, styles.normalText]}
                onChangeText={text => this.onChangebreak(text, 'seconds')}
                value={state.break.seconds}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Button */}
          <View style={styles.fixToText}>
            <Button
              title="Start"
              onPress={this.start}
            />
            <Button
              title="Reset"
              onPress={this.reset }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 60,
    color: 'blue'
  },
  textInput: {
    height: 40, 
    width: 50,
    borderColor: 'blue', 
    borderWidth: 1,
    marginLeft: 10,
    padding: 5,
    borderRadius: 10
  },
  fill: {
    flex: 1
  },
  flex1: {
    flexDirection: 'row',
    textAlign: 'center', 
    alignItems: 'center',
    flex:  1
  },
  normalText: {
    fontSize: 20,
    color: 'blue'
  },
  mtop20:{
    marginTop: 20,
    marginBottom: 20
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
