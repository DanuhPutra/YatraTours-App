import {View, Text, Image, ScrollView, StyleSheet, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ButtonLogin} from '../components/LoginButton';
import {InputLogin} from '../components/InputComponentLogin';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../store/actions/profileActionLogin';
import {Icon} from 'react-native-elements';
import {LogOutButton} from '../components/LogOutButton';

const ProfileScreen = () => {
  const globalData = useSelector(store => store.profileReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const onLogout = () => {
    setIsModalVisible(false);
    dispatch(loginUser(false));
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
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
          <InputLogin editable={false} value={globalData.username} />
          <View style={styles.headerLogin}>
            <Icon name="email" type="material-icons" color={'#4942E4'} />
            <Text style={styles.judulLogin}>Email</Text>
          </View>
          <InputLogin editable={false} value={globalData.email} />
          <View style={styles.headerLogin}>
            <Icon name="lock" type="font-awesome" color={'#4942E4'} />
            <Text style={styles.judulLogin}>Password</Text>
          </View>
          <InputLogin editable={false} value={globalData.password} />
        </View>
        <ButtonLogin
          text="Logout"
          isLogout={true}
          onPress={() => setIsModalVisible(true)}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}>
          <View style={styles.backgroundView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {' '}
                Kamu ingin Logout dari akun ini?
              </Text>
              <View style={styles.modalButton}>
                <LogOutButton text="yes" onPress={() => onLogout()} />
                <LogOutButton
                  text="no"
                  isLogout={true}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
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
  },
  imageContainer: {
    margin: 16,
  },
  image: {
    width: 240,
    height: 210,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#4942E4',
  },
  inputContainer: {
    padding: 16,
    width: '100%',
    width: '90%',
    borderRadius: 20,
    borderColor: '#4942E4',
    borderWidth: 1,
  },
  backgroundView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderColor: '#4942E4',
    width: '80%',
  },
  modalText: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    flexDirection: 'row',
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
export default ProfileScreen;
