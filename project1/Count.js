import React from 'react';
import {Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Count = (props) => (
    <Text style={styles.timmer}>
        {props.minutes < 10 ? '0' +  props.minutes : props.minutes}:  
        {props.seconds < 10 ? '0' + props.seconds : props.seconds}
    </Text>
)

Count.propTypes = {
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
} 

const styles = StyleSheet.create({
    timmer: {
      fontSize: 80,
      alignItems: 'center',
      flexDirection: 'row',
      textAlign: 'center',
      marginTop: 60,
      color: 'green'
    },
  });
export default Count