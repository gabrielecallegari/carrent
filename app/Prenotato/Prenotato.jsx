import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

export default function Prenotato({auto, callback}){
    return (
        <View style = {stile.main}>
            <Text style={stile.titolo}>Grazie per aver prenotato l'auto {auto.titolo}</Text>
            <Text style={stile.sottotitolo} >L'auto ti aspetta. Appena salirai partirà il counting del prezzo automaticametne</Text>
            <Image style={stile.clessidra} source={require('../../assets/hourglass.gif')}     />

            <View style={stile.viewbottone}>
                <Pressable style={stile.bottone} onPress={()=>callback()}>
                    <Text style={stile.testobottone} >Torna alla home</Text>
                </Pressable>
            </View>
        </View>
    )
}

const stile = StyleSheet.create({
    main: {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 10,
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titolo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sottotitolo: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18
    },
    clessidra: {
        width: 200,
        height: 200
    },
    viewbottone: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom : 50,
        alignItems: 'center'
    },
    bottone: {
        backgroundColor: '#2C2B34',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10
    },
    testobottone: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})