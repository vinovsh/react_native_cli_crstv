import React, { useEffect } from "react";
import {View,Text,Button,Dimensions,StyleSheet,BackHandler,StatusBar} from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Colors from '../Components/ColorPalet';
import Orientation from 'react-native-orientation';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get("screen").width;
const height = Dimensions.get('screen').height;

const ChannelPlayerScreen = (props) => {

    const navigation = useNavigation();
    useEffect(() => {
     
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
      function handleBackButtonClick() {
        Orientation.lockToPortrait();
      }
    

function onFullscreenEnter(){

    Orientation.lockToLandscape()
}

function onFullscreenExit(){
    Orientation.lockToPortrait();

}

function BackNavigation(){

  handleBackButtonClick();
  navigation.goBack();


}
    return (
        <View style={styles.container}>
           <StatusBar hidden={true} style="black" backgroundColor="#00000040" />
         <VideoPlayer
          style={styles.player}
          source={{
            uri:props.route.params.item.channel_url,
          
          overrideFileExtensionAndroid: 'm3u8' 
          }}
          repeat={true}
        
          fullscreen={true}
          resizeMode="contain"
          onEnterFullscreen={onFullscreenEnter}
          onExitFullscreen={onFullscreenExit}
          onBack={BackNavigation}
         // thumbnail={{ uri: props.route.params.item.channel_url, }}

        
        /> 
       
    </View>
    );
}

export default ChannelPlayerScreen;

const styles = StyleSheet.create({
 
    container:{
     flex:1,
    
 
     
    },
    player:{

        width:"100%",
        height:"100%",
     
    }

  });