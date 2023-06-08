import React, { useEffect, useRef, useState }  from "react";
import { Text, View, StyleSheet, Platform, Image, Pressable, ScrollView, Animated } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firstpage from '../firstpage/Firstpage'
import data from "../database/database";
import SlidingUpPanel from 'rn-sliding-up-panel';
import Prenotato from "../Prenotato/Prenotato";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({navigation}){

    const stile = Platform.OS === 'ios' ? st.ios : st.android

    const [prima,setPrima] = useState(data[Math.floor(Math.random() * data.length)])

    const [ nuovo, setNuovo] = useState(false)

    const [ car , setCar ] = useState(prima)

    const [prenotato , setPrenotato ] = useState(stile.prenotato)

    const [altri,setAltri] = useState(data.filter(elemento => elemento.id !== prima.id))

    const fadeAnim = useRef(new Animated.Value(0)).current

    const visible = () => {
        setPrenotato(stile.prenotato2)
        this._panel.hide()
        const index = altri.indexOf(car)
        let arr = altri
        let oggetto = car
        oggetto.occupata = true
        arr[index] = oggetto
        setAltri(arr)  
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
        
    };

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

    useFocusEffect(()=>{
        this._panel.hide()
        //setAltri(data.filter(elemento => elemento.id !== prima.id && elemento.occupata === false))
    })

    
    useEffect(()=>{
        getData()
        
    })

    function callback() {
        setNuovo(true)
        notVisible()
        setAltri(altri.filter(element => element.occupata === false))
    }
    return(
        <View style={{flex:1, backgroundColor: 'white'}}>
            <Animated.View style={[ prenotato, {opacity: fadeAnim,}]}>
                <Prenotato auto={car} callback={callback} />
            </Animated.View>
            
            {nuovo && 
            <View style={stile.main} >
                <Pressable style={stile.topCard.card} onPress={()=>{
                    setCar(prima)
                    this._panel.show()
                }} >
                    <Text style={stile.topCard.nearest}>Auto vicina</Text>
                    <Image style={stile.topCard.image}  source={prima.image}/>
                    <Text style={stile.topCard.modello}>{prima.marca} {prima.titolo}</Text> 

                    <View style={stile.topCard.footer}>
                        <View style={stile.topCard.dati}>
                            <Text style={{fontSize: 18, fontWeight: 500}}>⛽️ {prima.serbatoio}L, circa {prima.serbatoio*prima.kmlitro}km</Text>
                        </View>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>€{prima.prezzo}.00/h</Text>
                    </View>
                </Pressable>

                <View style={stile.centerCards.main}>
                    <View style={stile.centerCards.card1.main} >
                        <Image source={require("../../assets/profile.png")} style={stile.centerCards.card1.image}/>
                        <Text style={stile.centerCards.card1.text} >Gabriele</Text>
                    </View>

                    <Pressable style={stile.centerCards.card2.main} onPress={()=> navigation.navigate("Map")}>
                        <Image source={require("../../assets/maps.jpg")} style={stile.centerCards.card2.image}/>
                    </Pressable>
                </View>

                <View style={stile.altreAuto.main}>
                    <View style={stile.altreAuto.header}>
                        <Text style={stile.altreAuto.headerText}>Altre auto (Scrolla)</Text>
                        <Pressable>
                            <Text style={stile.altreAuto.headerText}>...</Text>
                        </Pressable>
                        
                    </View>
                    <ScrollView style={{width: '100%',paddingLeft: 10,paddingRight: 10, scrollbarColor: 'white', marginBottom: 10}} persistentScrollbar={true} > 
                            {altri.map(element => {
                                return (
                                    <View style={stile.altreAuto.map.main} key={element.id}>
                                        <View style={stile.altreAuto.map.top}>
                                            <View>
                                                <Text style={stile.altreAuto.map.title} numberOfLines={1}>{element.marca} {element.titolo}</Text>
                                                <Text style={stile.altreAuto.map.gas} > ⛽️ {element.serbatoio}L </Text>
                                            </View>
                                            <Pressable onPress={()=>{
                                                setCar(element)
                                                this._panel.show()
                                            }}>
                                                <Image source={require('../../assets/arrow.png')} style={stile.altreAuto.map.image}/>
                                            </Pressable>
                                        </View>
                                        <View style={stile.altreAuto.map.separator}/>
                                    </View>
                                )
                            })}
                        </ScrollView>
                </View>
                
            </View>
            }

            {!nuovo && 
                <Firstpage callback={callback}/>
            }
            <SlidingUpPanel ref={c => this._panel = c} showBackdrop={true} allowDragging={false} >
                    <View style={{flex: 1}}>
                        <View style={stile.slideup1.main}>
                            <View style={stile.slideup1.header}>
                                <View>
                                    <Text style={stile.slideup1.text} >{car.marca} {car.titolo}</Text>
                                    <Text style={stile.slideup1.text2}>⛽️ {car.serbatoio}L</Text>
                                </View>
                                <Pressable onPress={() => {this._panel.hide()} }> 
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

const st = StyleSheet.create({
    ios: {
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
        slideup1:{
            main:{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 450,
                backgroundColor: '#282931',
                borderRadius: 40,
                zIndex: 1,
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
                height: 330,
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
                paddingBottom: 10,
            },
            headerText: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
            },
            map: {
                main: {
                    marginTop: 10,
                },
                top:{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10
                },
                title: {
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    width: 250
                },
                gas:{
                    fontSize: 20,
                    color: 'white',
                    marginTop: 10,
                },
                image: {
                    width: 50,
                    height: 50
                },
                separator: {
                    width: '100%',
                    height: 1,
                    backgroundColor: 'grey'
                }
            }
        }

    },

    android: {
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
        slideup1:{
            main:{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 450,
                backgroundColor: '#282931',
                borderRadius: 40,
                zIndex: 1,
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

        main:{
            width: '100%',
            height: '100%',
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
                height: 280,
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
                paddingBottom: 10,
            },
            headerText: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
            },
            map: {
                main: {
                    marginTop: 10,
                },
                top:{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 0,
                    paddingBottom: 10
                },
                title: {
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    width: 250
                },
                gas:{
                    fontSize: 20,
                    color: 'white',
                    marginTop: 10,
                },
                image: {
                    width: 50,
                    height: 50
                },
                separator: {
                    width: '100%',
                    height: 1,
                    backgroundColor: 'grey'
                }
            }
        }
    }
})