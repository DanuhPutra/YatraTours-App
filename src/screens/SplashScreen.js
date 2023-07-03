import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.imageS}
        source={require('../../assets/images/logoF.png')}
      />
      <Image
        style={styles.image}
        source={require('../../assets/images/tulisan.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '90%',
    height: '40%',
    position: 'absolute',
    bottom: 0,
    left: 27,
    alignItems: 'center',
  },
  imageS: {
    width: '70%',
    height: '150%',
    resizeMode: 'contain',
    top: -350,
    left: 60,
  },
});
export default SplashScreen;
