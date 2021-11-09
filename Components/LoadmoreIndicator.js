import React from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator} from "react-native";
import Colors from '../Components/ColorPalet';
const LoadmoreIndicator =props=>{

  
    return (
        <View style={{
            
            backgroundColor:props.color,
           
            width:"100%",
            
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
            
            }}>
            
            <ActivityIndicator size="small" color={Colors.primary}/>
          
        </View>
    );
}

export default LoadmoreIndicator;

const styles = StyleSheet.create({
    container:{

       

    }
})