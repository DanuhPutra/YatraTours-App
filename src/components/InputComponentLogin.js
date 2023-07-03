import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Touchable,
} from 'react-native';
import {Icon} from 'react-native-elements';

export const InputLogin = props => {
  const {title, isPassword, iconName} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} {...props} />
        {isPassword ? (
          <View style={styles.iconContainer}>
            <TouchableOpacity {...props}>
              <Icon
                name={iconName}
                type="ionicon"
                size={22}
                color={'#4942E4'}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 8,
  },
  titleContainer: {
    marginLeft: 16,
  },
  title: {
    color: 'black',
  },
  inputContainer: {
    borderWidth: 0,
    borderRadius: 20,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  input: {
    padding: 8,
    flex: 1,
    color: 'black',
  },
  iconContainer: {
    padding: 8,
  },
});
