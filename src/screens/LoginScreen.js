import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonLogin} from '../components/LoginButton';
import {InputLogin} from '../components/InputComponentLogin';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../store/actions/profileActionLogin';
import {Icon} from 'react-native-elements';

const LoginScreen = props => {
  const {navigation} = props;
  const [isPassVisible, setIsPassVisible] = useState(false);
  const globalProfileData = useSelector(store => store.profileReducer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  checkData = () => {
    if (username === '' || password === '') {
      Alert.alert('Warning', 'Isi Data Akunmu dengan Benar!');
    } else if (
      username.toLowerCase() === globalProfileData.username.toLowerCase() &&
      password.toLowerCase() === globalProfileData.password.toLowerCase()
    ) {
      dispatch(loginUser(true));
    } else {
      Alert.alert(
        'Gagal',
        'Username atau Password salah! Silahkan coba lagi. ',
      );
    }

    setUsername('');
    setPassword('');
  };
  useEffect(() => {
    console.log('GLOBAL STATE ON LOGIN PAGE');
    console.log(globalProfileData);
  }, [globalProfileData]);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.mainContainer}>
        <View stule={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/loginLogo.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.headerLogin}>
            <Icon name="user" type="font-awesome" color={'#4942E4'} />
            <Text style={styles.judulLogin}>Username</Text>
          </View>
          <InputLogin
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <View style={styles.headerLogin}>
            <Icon name="lock" type="entypo" color={'#4942E4'} />
            <Text style={styles.judulLogin}>Password</Text>
          </View>
          <InputLogin
            isPassword={true}
            secureTextEntry={isPassVisible ? false : true}
            iconName={isPassVisible ? 'eye-off' : 'eye'}
            onPress={() => setIsPassVisible(!isPassVisible)}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <ButtonLogin text="Login" onPress={() => checkData()} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Kamu Belum memiliki Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
  },
  inputContainer: {
    padding: 16,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4942E4',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
    fontFamily: 'Geologica',
  },
  registerText: {
    color: '#0079FF',
    fontSize: 18,
    fontFamily: 'Judul-Login',
    textDecorationLine: 'underline',
  },
  headerLogin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -20,
    marginLeft: 10,
  },
  judulLogin: {
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: 'Judul-Login',
  },
});
export default LoginScreen;
