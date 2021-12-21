import React from 'react';
import {View,Text,Button,Dimensions,StyleSheet} from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Colors from '../ColorPalet';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LivePlayer = (props) => {
    const navigation = useNavigation();
    function onFullscreenEnter(){

        navigation.navigate("Live", { video:props.video })
    }
    
    function onFullscreenExit(){
        navigation.navigate("Live", { video:props.video })
    
    }

    
    return (
        <View style={styles.container}>

            <VideoPlayer
              style={styles.player}
              source={{
                uri: props.video,
               type: 'm3u8'
              // overrideFileExtensionAndroid: 'm3u8' 
              }}
              repeat={false}
              title={"Live"}
              fullscreen={false}
              resizeMode="cover"
              onEnterFullscreen={onFullscreenEnter}
              onExitFullscreen={onFullscreenExit}
              disableBack
              paused={false}
            
              
            
            />
           
        </View>
    );
}

export default LivePlayer;

const styles = StyleSheet.create({
 
    container:{
      height:width/1.75,
      width:window.width,
      backgroundColor:Colors.theamColor
 
     
    },
    player:{

        width:"100%",
        height:"100%",
        flex:1,
     
        
    }

  });