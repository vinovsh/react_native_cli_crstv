import React from 'react';
import {View,Text,Button,StyleSheet} from "react-native";
import { useTheme } from 'react-native-paper';
const VideoTitle = (props) => {
    const{colors}=useTheme();
  
    return (
        <View style={[styles.card,{borderBottomColor:colors.custom_text}]}>

           <Text ellipsizeMode='tail' numberOfLines={2} style={[styles.videoTitle,{color:colors.custom_text}]}>{props.title}</Text> 
        </View>
    );
}

export default VideoTitle;

const styles = StyleSheet.create({
    card:{

        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
       
        borderBottomWidth:0.15
    },
    videoTitle:{
        margin:10,
        fontSize:15,
        fontFamily:"Montserrat-SemiBold",
      }
})