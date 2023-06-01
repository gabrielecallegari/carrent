import React, { useState }  from "react";
import { Text, View, StyleSheet, Platform, Image, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firstpage from '../firstpage/Firstpage'
import data from "../database/database";

export default function Home(){

    const stile = Platform.OS === 'ios' ? st.ios : st.android

    const prima = data[Math.floor(Math.random() * data.length)]

    const [ nuovo, setNuovo] = useState(false)

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('olduser')
          if(value !== null) {
            setNuovo(true)
          }
        } catch(e) {
          // error reading value
          console.error(e);
        }
      }

    useState(()=>{
        getData()
    })

    function callback() {
        setNuovo(true)
    }
    return(
        <View style={{flex:1, backgroundColor: 'white'}}>
            {nuovo && 
            <View style={stile.main}>
                <View style={stile.topCard.card} >
                    <Text style={stile.topCard.nearest}>Auto vicina</Text>
                    <Image style={stile.topCard.image}  source={prima.image}/>
                    <Text style={stile.topCard.modello}>{prima.marca} {prima.titolo}</Text> 

                    <View style={stile.topCard.footer}>
                        <View style={stile.topCard.dati}>
                            <Text style={{fontSize: 18, fontWeight: 500}}>⛽️ {prima.serbatoio}L, circa {prima.serbatoio*prima.kmlitro}km</Text>
                        </View>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>€{prima.prezzo}.00/h</Text>
                    </View>
                </View>

                <View style={stile.centerCards.main}>
                    <Pressable style={stile.centerCards.card1.main}>
                        <Image source={require("../../assets/profile.png")} style={stile.centerCards.card1.image}/>
                        <Text style={stile.centerCards.card1.text} >{window.user === false? "Profilo" : "Login"}</Text>
                    </Pressable>

                    <Pressable style={stile.centerCards.card2.main}>
                        <Image source={require("../../assets/maps.jpg")} style={stile.centerCards.card2.image}/>
                    </Pressable>
                </View>

                <View style={stile.altreAuto.main}>
                    <View style={stile.altreAuto.header}>
                        <Text style={stile.altreAuto.headerText}>Altre auto</Text>
                        <Text style={stile.altreAuto.headerText}>...</Text>
                    </View>
                </View>
            </View>
            }

            {!nuovo && 
                <Firstpage callback={callback}/>
            }
        </View>
    )
}

const st = StyleSheet.create({
    ios: {
        main:{
            width: '100%',
            height: '100%',
            marginTop: 50,
            paddingLeft: 30,
            paddingRight: 30
        },

        topCard: {
            card: {
                width: '100%',
                backgroundColor: 'rgb(242, 242, 242)',
                marginTop: 10,
                borderRadius: 20,
                padding: 10
            },
            image: {
                width: '100%',
                height: 150,
                resizeMode: 'contain',
            },
            nearest: {
                fontSize: 20,
                fontWeight: '500'
            },
            modello:{
                fontSize: 25,
                fontWeight: 'bold'
            },
            footer: {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                alignItems: 'center'
            },
            dati:{
                flexDirection: 'row',
            }
        },

        centerCards: {
            main: {
                width: '100%', 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginTop: 20
            },
            card1: {
                main: {
                    width: '45%',
                    height: 150,
                    borderRadius: 10,
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: 'rgb(242, 242, 242)',
                },
                image:{
                    width: 100,
                    height: 100
                },
                text: {
                    fontSize: 25,
                    fontWeight: 500
                }
            },

            card2: {
                main: {
                    width: '45%',
                    height: 150,
                    borderRadius: 10,
                    alignItems: 'center',
                    backgroundColor: 'red'
                },
                image:{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10
                },
                text: {
                    fontSize: 25,
                    fontWeight: 500
                }
            }
        },
        altreAuto: {
            main:{
                with: '100%',
                height: 350,
                backgroundColor: '#282931',
                marginTop: 20,
                marginBottom: 40,
                borderRadius: 10,
                padding: 10
            },
            header: {
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingLeft: 10,
                paddingRight: 10,
            },
            headerText: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
            }
        }

    },

    android: {

    }
})