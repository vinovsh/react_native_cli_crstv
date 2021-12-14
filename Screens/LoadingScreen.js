import React from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator} from "react-native";
import Colors from '../Components/ColorPalet';
const LoadingScreen =props=>{

  
    return (
        <View style={{
            
          
            flex:1,
            position:"absolute",
           
            height:"100%",
            width:"100%",
            zIndex:10,
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
            
            }}>
            
            <ActivityIndicator size="large" color={Colors.purple}/>
          
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{

       

    }
})