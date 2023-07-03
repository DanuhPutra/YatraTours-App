import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import InputTambahScreen from '../components/InputTambahScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../../data/Data';
import realm from '../../store/realm';
const EditProdukScreen = props => {
  const {route, navigation} = props;
  const idProduct = route.params.idProduct;
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
      const updateData = realm
        .objects('Product')
        .filtered(`id=${idProduct}`)[0];
      if (
        updateData.productName === productData.productName &&
        updateData.imagePath === productData.imagePath &&
        updateData.category === productData.category &&
        updateData.description === productData.description &&
        updateData.price === parseInt(productData.price) &&
        updateData.instagram === productData.instagram &&
        updateData.facebook === productData.facebook &&
        updateData.phoneNumber === productData.phoneNumber
      ) {
        Alert.alert('engak ada yg di update');
      } else {
        realm.write(() => {
          updateData.productName = productData.productName;
          updateData.imagePath = productData.imagePath;
          updateData.category = productData.category;
          updateData.description = productData.description;
          updateData.price = parseInt(productData.price);
          updateData.instagram = productData.instagram;
          updateData.facebook = productData.facebook;
          updateData.phoneNumber = productData.phoneNumber;
        });
        Alert.alert('Berhasil!', 'produk ini berhasil di update', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    }
  };
  useEffect(() => {
    console.log(productData);
  }, [productData]);
  useEffect(() => {
    const data = realm.objects('Product').filtered(`id = ${idProduct}`)[0];
    setProductData({
      productName: data.productName,
      imagePath: data.imagePath,
      category: data.category,
      description: data.description,
      price: String(data.price),
      instagram: data.instagram,
      facebook: data.facebook,
      phoneNumber: data.phoneNumber,
    });
  }, [idProduct]);
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
                    : 'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <InputTambahScreen
            placeholder="nama produk"
            value={productData.productName}
            onChangeText={text => onInputChange('productName', text)}
          />
          <SelectDropdown
            data={categoryList}
            defaultButtonText="select category"
            defaultValueByIndex={productData.category - 1}
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
          />
        </View>
        <View style={styles.horizontalContainer}>
          <InputTambahScreen
            placeholder="nama produk"
            value={productData.description}
            onChangeText={text => onInputChange('description', text)}
            isDescription={true}
          />
          <InputTambahScreen
            placeholder="nama produk"
            value={productData.price}
            onChangeText={text => onInputChange('price', text)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.sellerText}>Seller Contact</Text>
        <InputTambahScreen
          placeholder="sjdlskajdkla"
          value={productData.phoneNumber}
          onChangeText={text => onInputChange('phoneNumber', text)}
          isIcon={true}
          name="whatsapp"
          type="font-awesome"
          keyboardType="phone-pad"
        />
        <InputTambahScreen
          placeholder="sjdlskajdkla"
          value={productData.instagram}
          onChangeText={text => onInputChange('instagram', text)}
          isIcon={true}
          name="instagram"
          type="font-awesome"
        />
        <InputTambahScreen
          placeholder="sjdlskajdkla"
          value={productData.facebook}
          onChangeText={text => onInputChange('facebook', text)}
          isIcon={true}
          name="facebook"
          type="font-awesome"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>EDIT PRODUCT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 12,
    color: 'white',
  },
});
export default EditProdukScreen;
