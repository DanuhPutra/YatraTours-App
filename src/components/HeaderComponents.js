import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ButtonComponent } from './ButtonComponents'
export const HeaderComponents = (props) => {
    const {navigation} = props

    const dajjal = () =>{
        alert('alo')
    }
    
  return (
    <View style={styles.container}>
        <ButtonComponent
            backgroundColor='green'
            title='BOOKING'
            onPress={() => dajjal() }
        />
        <ButtonComponent
            backgroundColor='green'
            title='ABOUT'
            onPress={() => navigation.navigate('dajjal') }
        />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: -36,
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informasiSaldo: {
    // width: '60%',
    flexDirection:'column'
  },
  labelSaldo: {
    fontSize: 20,
  },
  valueSaldo: {
    fontSize: 20,
  },
  labelPoint: {
    fontSize: 12,
  },
  valuePoint: {
    fontSize: 12,
    color: 'yellow',
  },
  buttonAksi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    margin:8,
    height:40,
    borderRadius:8
},
title:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
}
});
