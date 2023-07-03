import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'


export const ButtonComponent = (props) => {
    const {backgroundColor,title} = props
  return (
    <TouchableOpacity 
        style={[styles.buttonContainer,{backgroundColor:backgroundColor}]}
        {...props}
    >
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
})