import React, { useEffect } from "react";
import {View,Text,Button,Dimensions,StyleSheet,BackHandler,StatusBar} from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Colors from '../Components/ColorPalet';
import Orientation from 'react-native-orientation';



const LivePlayerFull = (props) => {

    useEffect(() => {
        Orientation.lockToLandscape();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
      function handleBackButtonClick() {
        Orientation.lockToPortrait();
      }
    

function onFullscreenEnter(){

    props.navigation.navigate("Home")
}

function onFullscreenExit(){
    props.navigation.navigate("Home")

}

function BackNavigation(){

  handleBackButtonClick();
  props.navigation.navigate("Home")


}
    return (
        <View style={styles.container}>
           <StatusBar hidden={true} style="black" backgroundColor="#00000040" />
        <VideoPlayer
          style={styles.player}
          source={{
            uri: props.route.params.video,
           type: 'm3u8'
          // overrideFileExtensionAndroid: 'm3u8' 
          }}
          repeat={true}
          title={"Live"}
          fullscreen={true}
          resizeMode="cover"
          onEnterFullscreen={onFullscreenEnter}
          onExitFullscreen={onFullscreenExit}
          onBack={BackNavigation}
        
        />
       
    </View>
    );
}

export default LivePlayerFull;

const styles = StyleSheet.create({
 
    container:{
     flex:1,
    
 
     
    },
    player:{

        width:"100%",
        height:"100%",
     
    }

  });