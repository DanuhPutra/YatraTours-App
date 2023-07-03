import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import InputTambahScreen from '../components/InputTambahScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../../data/Data';
import realm from '../../store/realm';
import {Icon, CheckBox} from 'react-native-elements';
import {MediaComponent} from '../components/MediaComponents';
import {ButtonComponent} from '../components/ButtonComponents';
const SemuaProduk = props => {
  const [data, setData] = useState([]);
  const {route, navigation} = props;
  const category = route.params.categoryId;
  const [isBuy, setIsBuy] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [contact, setContact] = useState({
    phoneNumber: '',
    instagram: '',
    facebook: '',
  });
  const collectData = () => {
    const allData = realm.objects('Product').filtered(`category = ${category}`);
    const newData = allData.map(item => {
      item.checkedStatus = false;
      return item;
    });
    setData(allData);
    console.log(newData);
  };
  const buyProduct = (whatsapp, instagramId, facebookId) => {
    setContact({
      phoneNumber: whatsapp,
      instagram: instagramId,
      facebook: facebookId,
    });
    setIsBuy(true);
  };
  const onClickMedia = type => {
    if (type === 'whatsapp') {
      Linking.openURL(`https://wa.me/${contact.phoneNumber}`);
    } else if (type === 'instagram') {
      Linking.openURL(`https://www.instagram.com/${contact.instagram}`);
    } else if (type === 'facebook') {
      Linking.openURL(`https://m.me/${contact.facebook}`);
    }
  };
  const setCheckBox = (id, status) => {
    const newData = data.map(item => {
      if (item.id === id) {
        item.checkedStatus = !status;
      }
      return item;
    });
    setData(newData);
  };
  const onCancel = () => {
    const newData = data.map(item => {
      item.checkedStatus = false;
      return item;
    });
    setData(newData);
    setIsRemove(false);
  };
  const onDelete = () => {
    const checkedTrue = [];
    data.forEach(item => {
      if (item.checkedStatus) {
        checkedTrue.push(item.id);
      }
    });
    if (checkedTrue.length != 0) {
      realm.write(() => {
        for (i = 0; i < checkedTrue.length; i++) {
          const removeData = realm
            .objects('Product')
            .filtered(`id=${checkedTrue[i]}`);
          realm.delete(removeData);
        }
      });
      alert('produk ini sudah dihapus');
      setIsRemove(false);
      collectData();
    } else {
      alert('tidak ada produk yang bisa dihapus');
    }
  };
  useEffect(() => {
    const productPage = navigation.addListener('focus', () => {
      collectData();
    });
    return productPage;
  }, []);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        contentContainerStyle={styles.FlatlistContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemButton}
              onPress={() => navigation.navigate('Edit', {idProduct: item.id})}
              onLongPress={() => setIsRemove(true)}>
              <View style={styles.productContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('gambarZoom', {
                      imagePath: item.imagePath,
                    })
                  }>
                  <Image style={styles.image} source={{uri: item.imagePath}} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.productName}</Text>
                  <Text style={styles.text}>{item.description}</Text>
                  <Text style={styles.text}>${item.price}</Text>
                </View>
              </View>
              {isRemove ? (
                <CheckBox
                  size={30}
                  containerStyle={styles.checkBox}
                  onPress={() => setCheckBox(item.id, item.checkedStatus)}
                  checked={item.checkedStatus}
                />
              ) : (
                <TouchableOpacity
                  style={styles.satu}
                  onPress={() =>
                    buyProduct(item.phoneNumber, item.instagram, item.facebook)
                  }>
                  <Icon name="shoppingcart" type="antdesign" size={30} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.align}>
            <Text>No items in this category</Text>
          </View>
        }
      />
      {isBuy ? (
        <View style={styles.modalContainer}>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.cancle}
              onPress={() => setIsBuy(false)}>
              <Icon name="close" type="antdesign" size={18} />
            </TouchableOpacity>
            <Text style={[styles.sellerText, styles.title]}>
              Hubungi kontak tour guide di bawah ini :
            </Text>
            {contact.phoneNumber !== '' ? (
              <MediaComponent
                source={require('../../assets/images/whatsapp.png')}
                value={contact.phoneNumber}
                onPress={() => onClickMedia('whatsapp')}
              />
            ) : null}
            {contact.instagram !== '' ? (
              <MediaComponent
                source={require('../../assets/images/instagram.png')}
                value={contact.instagram}
                onPress={() => onClickMedia('instagram')}
              />
            ) : null}
            {contact.facebook !== '' ? (
              <MediaComponent
                source={require('../../assets/images/facebook.png')}
                value={contact.facebook}
                onPress={() => onClickMedia('facebook')}
              />
            ) : null}
          </View>
        </View>
      ) : null}
      {isRemove ? (
        <View const style={styles.buttonContainer}>
          <ButtonComponent
            backgroundColor="#4942E4"
            title="delete"
            onPress={() => onDelete()}
          />
          <ButtonComponent
            backgroundColor="#4942E4"
            title="Cancle"
            onPress={() => onCancel()}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  FlatlistContainer: {
    padding: 8,
  },
  itemButton: {
    margin: 8,
    padding: 8,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#4942E4',
    borderWidth: 2,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  align: {
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancle: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  sellerText: {
    marginBottom: 8,
    marginTop: 32,
  },
  checkBox: {
    position: 'absolute',
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 60,
  },
  satu: {
    marginRight: 10,
  },
});
export default SemuaProduk;
