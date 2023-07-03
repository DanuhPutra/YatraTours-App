import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import TambahTourScreen from '../screens/tambahTourScreen';
import SemuaProduk from '../screens/SemuaProduk';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useSelector} from 'react-redux';
import GambarZoomScreen from '../screens/GambarZoomScreen';
import EditProdukScreen from '../screens/EditProdukScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home ',
          headerTitleStyle: {color: 'black'},
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="home" type="material" />,
        }}
      />
      <Drawer.Screen
        name="addTours"
        component={TambahTourScreen}
        options={{
          title: 'Add Tours',
          headerTitleStyle: {color: 'black'},
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="plus" type="entypo" />,
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          title: ' Profil',
          iconContainerStyle: 'red',
          headerTitleStyle: {color: 'black'},
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="man" type="entypo" />,
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  const isLogin = useSelector(store => store.profileReducer.isLogin);
  return (
    <NavigationContainer>
      {isLogin ? (
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen
            name="Drawer"
            component={DrawerNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SemuaProduk"
            component={SemuaProduk}
            options={{
              title: 'Tours Available',
              headerTitleStyle: {color: 'black'},
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="gambarZoom"
            component={GambarZoomScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Edit"
            component={EditProdukScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
