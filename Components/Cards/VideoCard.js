import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-controls';
import {useTheme} from 'react-native-paper';

const width=Dimensions.get('window').width;
const VideoCard =props=>{

  const{colors}=useTheme();
    return (
        <View>
           <Text style={[styles.CategoryTitle,{color:colors.custom_text}]}>{props.title}</Text>
           <TouchableOpacity  style={styles.playerContainer}>
              <VideoPlayer
                 style={styles.player}
                
         
                 source={props.videoSource}
                 muted={true}
                 resizeMode="cover"
                 disablePlayPause
                 disableSeekbar
                 disableVolume
                 disableTimer
                 disableBack
                 disableFullscreen
                 controls={false}
                 posterResizeMode="cover"
                 repeat={true}
                 showOnStart={false}
                 controlTimeout={1}
                 
        
        
              />

           </TouchableOpacity>

        </View>
      );



}

export default VideoCard;



const styles = StyleSheet.create({
 
   
    player:{
      borderRadius:15,
    },
    playerContainer:{
    
      width:width/2.3,
      height:width/2.3,
      borderRadius:15,
      backgroundColor:Colors.theamColor,
    
      shadowColor:Colors.shadow,
      elevation:7,
      margin:10,
      padding:0,
        
    },
    CategoryTitle:{
      marginTop:10,
        
      fontSize:15,
     
      paddingHorizontal:15,
      fontFamily:"Montserrat-SemiBold",
    
      
    
        
    }
   
  });


