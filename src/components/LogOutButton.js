import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
export const LogOutButton = props => {
  const {text, isLogout} = props;
  return (
    <View
      style={[
        styles.buttonContainer,
        {backgroundColor: isLogout ? '#4721e2' : '#4942E4'},
      ]}>
      <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '30%',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 3,
    },
    shadowOpacity: 10,
    shadowRadius: 4.65,
    elevation: 17,
  },
  button: {
    padding: 8,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  iconLoginBtn: {
    fontSize: 200,
  },
});
