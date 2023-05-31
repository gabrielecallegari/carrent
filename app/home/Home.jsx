import React, { useState }  from "react";
import { Text, View, StyleSheet, Platform, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firstpage from '../firstpage/Firstpage'

export default function Home(){

    const stile = Platform.OS === 'ios' ? st.ios : st.android

    const [ nuovo, setNuovo] = useState(false)

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('olduser')
          if(value !== null) {
            console.log("QUI");
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
                    <Image style={stile.topCard.image}  source={require('../../assets/500x.png')}/>
                    <Text style={stile.topCard.modello}>Fiat 500x</Text> 

                    <View style={stile.topCard.footer}>
                        <View style={stile.topCard.dati}>
                            <Text style={{fontSize: 18, fontWeight: 500}}>⛽️ 30L, circa 500km</Text>
                        </View>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>€45.00/h</Text>
                    </View>
                </View>

                <View style={stile.centerCards.main}>
                    
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
                marginTop: 20,
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
                marginTop: 10
            },
            dati:{
                flexDirection: 'row',
            }
        },

        centerCards: {
            main: {
                width: '100%', 
                flexDirection: 'row', 
                justifyContent: 'space-between'
            },
            card1: {
                
            }
        }

    },

    android: {

    }
})