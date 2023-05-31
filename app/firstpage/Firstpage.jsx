import { StatusBar } from "expo-status-bar";
import React from "react";
import { View,StyleSheet, Image, Dimensions, Text, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Firstpage({callback}){

    const _handleButton = ()=>{
        const storeData = async () => {
            try {
                await AsyncStorage.setItem('olduser', "true")
            } catch (e) {
                // saving error
            }
        }
        navigation.navigate("Home")
        storeData()
    }

    return (
        <View style={stili.main}>
            <StatusBar style="light" />
            <Image style={stili.image} source={require('../../assets/rav4.png')} />
            <View style={{marginLeft: 30, marginRight: 30}}>
                <View style= {{marginTop: 30}}>
                    <Text style={stili.text}>Premium Cars.</Text>
                    <Text style={stili.text}>Enjoy the Luxury</Text>
                </View>
                <View style={{marginTop: 20}} >
                <Text style={stili.text2}>Premium and prestige car daily rental.</Text>
                    <Text style={stili.text2}>Experience the thrill at a lower price</Text>
                </View>
            </View>
            <Pressable style={stili.bottone} onPress={()=>callback()} >
                <Text style={stili.testoBottone}>Let's Go</Text>
            </Pressable>
        </View>
    )
}

const stili = StyleSheet.create({
    main: {
        backgroundColor: '#2C2B34',
        width: '100%',
        height: '100%'
    },

    image: {
        width: 500,
        height: 300,
        marginTop: '50%'
    },

    text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    },
    text2: {
        fontSize: 15,
        color: '#8E8E8E',
    },
    bottone: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 50,
        marginLeft: 40,
        marginRight: 40,
        alignItems: "center"
    },
    testoBottone: {
        color: '#2C2B34', 
        fontSize: 20, 
        padding: 20,
        fontWeight: 'bold'
    }
})