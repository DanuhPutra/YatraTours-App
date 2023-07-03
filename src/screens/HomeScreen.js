import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {imageSlider} from '../../data/Data';
import {categoryList} from '../../data/Data';
import {HeaderComponents} from '../components/HeaderComponents';
import {ButtonComponent} from '../components/ButtonComponents';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {ceil} from 'react-native-reanimated';
const HomeScreen = props => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <SliderBox
        images={imageSlider}
        autoplay={true}
        circleLoop={true}
        sliderBoxHeight={250}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>List Tour :</Text>
      </View>
      <FlatList
        horizontal
        data={categoryList}
        keyExtractor={item => item.id}
        contentContainerStyle={{flex: categoryList.length === 0 ? 1 : null}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('SemuaProduk', {categoryId: item.id})
              }>
              <View style={styles.shadowImage}>
                <Image source={{uri: item.icon}} style={styles.icon} />
              </View>
              <Text style={styles.deskripsi}>{item.deskripsi}</Text>
              <Text style={styles.buttonWarning}>
                {' '}
                Klik untuk melihat semua tour
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    flex: 1,
    borderRadius: 25,
    height: hp(`45%`),
    width: wp(`70%`),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#4942E4',
    marginLeft: 25,
    marginRight: 25,
  },
  icon: {
    width: wp(`40%`),
    height: hp(`25%`),
    resizeMode: 'contain',
  },
  shadowImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0.3,
      height: 0.5,
    },
    shadowOpacity: 1,
    elevation: 22,
    width: wp(`35%`),
    height: hp(`18%`),
    borderRadius: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    color: 'black',
  },
  popupHeader: {
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 1,
    marginTop: -36,
    flexDirection: 'row',
  },

  deskripsi: {
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Geologica',
  },
  headingContainer: {
    padding: 10,
    marginLeft: 10,
  },
  headingText: {
    textAlign: 'left',
    fontSize: 28,
    fontFamily: 'Judul-Login',
    color: '#000',
  },
  buttonWarning: {
    paddingTop: 10,
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
  },
});

export default HomeScreen;
