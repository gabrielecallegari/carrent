import React from "react";
import { View, } from "react-native";
import Notlogged from "../notlogged/Notlogged";
import Profile from "./Profile";



export default function Redirection({navigation}){

    const callback = (num)=>{
        if(num===0){
            navigation.navigate('Home')
        }

    }


    return (
        <View style={{width: '100%', height: '100%'}}>
            {window.islogged === true && 
                <Profile />
            }

            
            {
                window.islogged !== true && 
                <Notlogged callback={callback} />
            }
        </View>
    )
}