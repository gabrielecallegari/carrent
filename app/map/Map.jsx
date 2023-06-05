import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Platform, Image, Pressable, ScrollView, Animated, ImageBackground } from "react-native";
import data from "../database/database";
import SlidingUpPanel from "rn-sliding-up-panel";
import Prenotato from "../Prenotato/Prenotato";

export default function Map({navigation}){

    const [car,setCar] = useState(data[0])

    const [prenotato , setPrenotato ] = useState(stile.prenotato)

    const fadeAnim = useRef(new Animated.Value(0)).current

    

    const visible = () => {
        setPrenotato(stile.prenotato2)
        this._panel.hide()  
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
    };

    const notVisible = () => {
        
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(()=>{setPrenotato(stile.prenotato1)});
        navigation.goBack()
    };

    function callback() {
        notVisible()
    }

    return (
        <View style={stile.main}>
            <Animated.View style={[ prenotato, {opacity: fadeAnim,}]}>
                <Prenotato auto={car} callback={callback} />
            </Animated.View>
            <Pressable style={stile.back} onPress={()=> navigation.goBack()} >
                
                <ImageBackground source={require('../../assets/back2.png')} style={stile.backimg}/>
            </Pressable>
            <Image source={require('../../assets/maps.jpg')}   />
            {!data[0].occupata && 
                <Pressable style={stile.bottone1} onPress={()=>{
                    setCar(data[0])
                    this._panel2.show()
                }}>
                    <View style={stile.dentrobottone}/>
                </Pressable>
            }
            {!data[1].occupata && 
                <Pressable style={stile.bottone2} onPress={()=>{
                    setCar(data[1])
                    this._panel2.show()
                }}>
                    <View style={stile.dentrobottone}/>
                </Pressable>
            }

            {!data[2].occupata && 
                <Pressable style={stile.bottone3} onPress={()=>{
                    setCar(data[2])
                    this._panel2.show()
                }}>
                    <View style={stile.dentrobottone}/>
                </Pressable>
            }
            <SlidingUpPanel ref={c => this._panel2 = c} showBackdrop={true} allowDragging={false}>
                <View style={{flex:1}}>
                    <View style={stile.slideup1.main}>
                        <View style={stile.slideup1.header}>
                            <View>
                                <Text style={stile.slideup1.text} >{car.marca} {car.titolo}</Text>
                                <Text style={stile.slideup1.text2}>⛽️ {car.serbatoio}L</Text>
                            </View>
                            <Pressable onPress={() => {this._panel2.hide()} }> 
                                <Image source={require('../../assets/x.png')} style={stile.slideup1.image} />
                            </Pressable>
                        </View>
                        <View style={stile.slideup2.main}>
                            <Image style={stile.slideup2.image} source={car.image}/>
                            <Text style={stile.slideup2.text}>Features</Text>
                            <View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop:10, marginLeft: -20, marginRight: -20}}>
                                    {car.features.map(element => {
                                        return (
                                            <View style={stile.slideup2.card} key={element}>
                                                <Text style={stile.slideup2.cardtext} >{element}</Text>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            </View>

                            <Text style={stile.slideup2.textprezzo}>Prezzo: €{car.prezzo}/h</Text>

                            <View style={{justifyContent: 'center',alignItems: 'center', position: 'absolute', bottom: 40, left: 0, right: 0}}>
                                <Pressable style={stile.slideup2.button} onPress={()=>{
                                        visible() 
                                        for(let i = 0; i<data.length; i++){
                                            if(data[i].id===car.id){
                                                data[i].occupata=true
                                            }
                                        }                          
                                    }}>
                                    <Text style={stile.slideup2.textbutton}>Prenota</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </SlidingUpPanel>
        </View>
    )
}

const stile = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1
    },
    prenotato: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    prenotato2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    bottone1: {
        position: 'absolute',
        top: 170,
        width: 35,
        height: 35,
        backgroundColor: '#2C2B34',
        borderRadius: 50,
        left: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottone2: {
        position: 'absolute',
        top: 370,
        width: 35,
        height: 35,
        backgroundColor: '#2C2B34',
        borderRadius: 50,
        right: 140,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottone3: {
        position: 'absolute',
        top: 670,
        width: 35,
        height: 35,
        backgroundColor: '#2C2B34',
        borderRadius: 50,
        right: 190,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dentrobottone:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    backimg: {
        width: 50,
        height: 50
    },
    back:{
        position: "absolute",
        top: 40,
        left: 10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 242, 242, 0.9)',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#2C2B34'
    },
    slideup1:{
        main:{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 450,
            backgroundColor: '#282931',
            borderRadius: 40,
            zIndex: 2,
            padding: 20
        },
        text:{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold'
        },
        header:{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        image:{
            width: 50,
            height: 50,
        },
        text2:{
            color: 'white',
            fontSize: 18,
            fontWeight: 500,
            marginTop: 5
        },
    },

    slideup2:{
        main: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 350,
            backgroundColor: 'white',
            borderRadius: 40,
            zIndex: 2,
            padding: 20,
        },
        text: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black'
        },
        image:{
            position: 'absolute',
            top: -50,
            width: 200,
            height: 100,
            right: 60,
            resizeMode: 'contain',
        },
        card: {
            width: 200,
            height: 80,
            borderWidth: 1,
            borderColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 5
        },
        cardtext: {
            fontSize: 20,
            fontWeight: 600
        },
        button: {
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: '#282931',
            borderRadius: 10,
        },
        textbutton:{
            color: 'white',
            fontSize: 20,
            fontWeight: 600
        },
        textprezzo: {
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10
        }
    },
})