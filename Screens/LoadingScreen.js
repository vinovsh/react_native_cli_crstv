import React from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator} from "react-native";
import Colors from '../Components/ColorPalet';
const LoadingScreen = () => {

  
    return (
        <View style={styles.container}>
            
            <ActivityIndicator size="large" color={Colors.primary}/>
          
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container:{

        flex:1,
        position:"absolute",
        backgroundColor:"#0003",
        height:"100%",
        width:"100%",
        zIndex:10,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"

    }
})