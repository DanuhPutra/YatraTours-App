import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import InputTambahScreen from '../components/InputTambahScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../../data/Data';
import realm from '../../store/realm';
const TambahTourScreen = () => {
  const dropdownRef = useRef({});
  const [productData, setProductData] = useState({
    productName: '',
    imagePath: '',
    category: null,
    description: '',
    price: null,
    instagram: '',
    facebook: '',
    phoneNumber: '',
  });

  const addImage = () => {
    ImageCropPicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setProductData({
          ...productData,
          imagePath: image.path,
        });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };
  const onInputChange = (type, value) => {
    setProductData({
      ...productData,
      [type]: value,
    });
  };
  const saveData = () => {
    if (
      productData.productName === '' ||
      productData.imagePath === '' ||
      productData.description === '' ||
      productData.price === ''
    ) {
      alert('please fill all your product information!');
    } else if (
      productData.phoneNumber === '' &&
      productData.instagram === '' &&
      productData.facebook === ''
    ) {
      alert('please fill at least on seller contact!');
    } else {
      const allData = realm.objects('Product');
      const lastId = allData.length === 0 ? 0 : allData[allData.length - 1].id;

      realm.write(() => {
        realm.create('Product', {
          id: lastId + 1,
          productName: productData.productName,
          imagePath: productData.imagePath,
          category: productData.category,
          description: productData.description,
          price: parseInt(productData.price),
          instagram: productData.instagram,
          facebook: productData.facebook,
          phoneNumber: productData.phoneNumber,
        });
      });
      alert('tour yang baru kamu buat berhasil ditambahkan!');
      setProductData({
        productName: '',
        imagePath: '',
        category: null,
        description: '',
        price: '',
        instagram: '',
        facebook: '',
        phoneNumber: '',
      });
      dropdownRef.current.reset();
    }
  };
  useEffect(() => {
    console.log(productData);
  }, [productData]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => addImage()}>
            <Image
              style={{
                width: productData.imagePath !== '' ? 200 : 50,
                height: productData.imagePath !== '' ? 200 : 50,
              }}
              source={{
                uri:
                  productData.imagePath !== ''
                    ? productData.imagePath
                    : 'https://img.icons8.com/?size=512&id=60628&format=png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <InputTambahScreen
            placeholder="Nama Produk"
            placeholderTextColor={'black'}
            value={productData.productName}
            onChangeText={text => onInputChange('productName', text)}
          />
          <SelectDropdown
            data={categoryList}
            defaultButtonText="Kategori Produk"
            onSelect={item => {
              onInputChange('category', item.id);
            }}
            buttonTextAfterSelection={item => {
              return item.name;
            }}
            rowTextForSelection={item => {
              return item.name;
            }}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectText}
            ref={dropdownRef}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <InputTambahScreen
            placeholder="Deskripsi Produk"
            value={productData.description}
            onChangeText={text => onInputChange('description', text)}
            isDescription={true}
            placeholderTextColor={'black'}
          />
          <InputTambahScreen
            placeholder="Harga"
            value={productData.price}
            onChangeText={text => onInputChange('price', text)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
            keyboardType="numeric"
            placeholderTextColor={'black'}
          />
        </View>
        <Text style={styles.sellerText}>Kontak yang bisa di hubungi</Text>
        <InputTambahScreen
          placeholder="Nomor Telepon"
          value={productData.phoneNumber}
          onChangeText={text => onInputChange('phoneNumber', text)}
          isIcon={true}
          name="whatsapp"
          type="font-awesome"
          keyboardType="phone-pad"
          placeholderTextColor={'black'}
        />
        <InputTambahScreen
          placeholder="Username Instagram"
          value={productData.instagram}
          onChangeText={text => onInputChange('instagram', text)}
          isIcon={true}
          name="instagram-with-circle"
          type="entypo"
          placeholderTextColor={'black'}
        />
        <InputTambahScreen
          placeholder="Username Facebook"
          value={productData.facebook}
          onChangeText={text => onInputChange('facebook', text)}
          isIcon={true}
          name="facebook"
          type="font-awesome5-brands"
          placeholderTextColor={'black'}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>Tambahkan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    color: 'black',
  },
  scroll: {
    margin: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  imageButton: {
    width: 200,
    height: 200,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4942E4',
    borderRadius: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sellerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 0,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#4942E4',
  },
  saveText: {
    color: 'white',
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: '#4942E4',
    width: 150,
    height: 30,
    marginLeft: 8,
  },
  selectText: {
    fontSize: 15,
    color: 'white',
  },
});
export default TambahTourScreen;
