import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonLogin} from '../components/LoginButton';
import {InputLogin} from '../components/InputComponentLogin';
import {useSelector, useDispatch} from 'react-redux';
import {createProfile} from '../../store/actions/profileActionLogin';
import {Icon} from 'react-native-elements';
const RegisterScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const globalProfileData = useSelector(store => store.profileReducer);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isEmailFormat, setIsEmailFormat] = useState(true);
  const [isPassVisible, setIsPassVisible] = useState(false);

  const onChangeInput = (inputType, value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (inputType === 'email') {
      if (!emailRegex.test(value)) {
        setIsEmailFormat(false);
      } else {
        setIsEmailFormat(true);
      }
    }
    setForm({
      ...form,
      [inputType]: value,
    });
  };

  const sendData = () => {
    if (
      form.username === '' ||
      form.email === '' ||
      form.password === '' ||
      !isEmailFormat
    ) {
      Alert.alert('Coba lagi', 'Tolong isi Data Kamu dengan Benar & lengkap');
    } else {
      dispatch(createProfile(form));
      Alert.alert('Selamat', 'Akun baru kamu berhasil dibuat', [
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    }
  };

  useEffect(() => {
    console.log('LOCAL STATE');
    console.log('username:' + form.username);
    console.log('email:' + form.email);
    console.log('password:' + form.password);
  }, [form]);
  useEffect(() => {
    console.log('global state on register page');
    console.log(globalProfileData);
  }, [globalProfileData]);
  useEffect(() => {
    if (form.email === '') {
      setIsEmailFormat(true);
    }
  }, [form.email]);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.mainContainer}>
        <View stule={styles.imageContainerLogo}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/images/register.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.headerLogin}>
            <Icon name="user" type="font-awesome" color={'#4942E4'} />
            <Text style={styles.judulLogin}>Username</Text>
          </View>
          <InputLogin onChangeText={text => onChangeInput('username', text)} />
          <View style={styles.headerLogin}>
            <Icon
              name="email"
              type="material-community-icons"
              color={'#4942E4'}
            />
            <Text style={styles.judulLogin}>Email</Text>
          </View>
          <InputLogin onChangeText={text => onChangeInput('email', text)} />
          {isEmailFormat ? null : (
            <View style={styles.warning}>
              <Text style={styles.textwaring}>
                tolong isi email dengan benar!
              </Text>
            </View>
          )}
          <View style={styles.headerLogin}>
            <Icon name="lock" type="entypo" color={'#4942E4'} />
            <Text style={styles.judulLogin}>Password</Text>
          </View>
          <InputLogin
            onChangeText={text => onChangeInput('password', text)}
            isPassword={true}
            secureTextEntry={isPassVisible ? false : true}
            iconName={isPassVisible ? 'eye-off' : 'eye'}
            onPress={() => setIsPassVisible(!isPassVisible)}
          />
        </View>
        <ButtonLogin text="Register" onPress={() => sendData()} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Kamu sudah memiliki Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
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
  inputContainer: {
    padding: 16,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#4942E4',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
    fontFamily: 'Geologica',
  },
  loginText: {
    color: '#0079FF',
    fontSize: 18,
    fontFamily: 'Judul-Login',
    textDecorationLine: 'underline',
  },
  warning: {
    marginBottom: 16,
    marginLeft: 16,
  },
  textwaring: {
    color: 'red',
  },
  imageContainerLogo: {
    marginTop: 32,
  },
  imageLogo: {
    width: 120,
    height: 120,
    marginBottom: 30,
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
export default RegisterScreen;
