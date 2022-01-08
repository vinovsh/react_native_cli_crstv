import React,{useState,useRef} from 'react';
import {View,Text,Button,Dimensions,StyleSheet,ActivityIndicator,TouchableOpacity} from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Colors from '../ColorPalet';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LivePlayer = (props) => {

  const timerRef = useRef(null);

  const [isBuffer, setIsbuffer] = useState(true);
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isPlay, setIsPlay] = useState(true);

    const navigation = useNavigation();
    function onFullscreenEnter(){

        navigation.navigate("Live", { video:props.video })
    }
    
    function onFullscreenExit(){
        navigation.navigate("Live", { video:props.video })
    
  }


  const overlayTimeout = () => {
    
     timerRef.current = setTimeout(() => {
              setIsShowOverlay(false);
          }, 3000);
  }
  
  const overlayClick = () => {
    clearTimeout(timerRef.current);
  
    if (isShowOverlay == true) {

      if (isPlay === true) {
          setIsShowOverlay(false);
      }
     
    } else {
      setIsShowOverlay(true);
      if (isPlay == true) {
        
        overlayTimeout();

      }
      
    }
  }

    
  return (
      <TouchableOpacity onPress={()=>{overlayClick()}} activeOpacity={1}>
        <View style={styles.container}>

           {/*  <VideoPlayer
              style={styles.player}
              source={{
                uri: props.video,
              
              }}
              repeat={false}
              title={"Live"}
              fullscreen={false}
              resizeMode="stretch"
              onEnterFullscreen={onFullscreenEnter}
              onExitFullscreen={onFullscreenExit}
              disableBack
              paused={false}
            
              
            
            />  */}
             <Video
                
                source={{ uri: props.video }}   
                
                style={styles.player}
                resizeMode="stretch"
                controls={false}
                type="m3u8"
                filterEnabled={true}
                paused={!isPlay}
                onLoadStart={(e) => {
            
                  setIsbuffer(true);

                }}
          
                onLoad={(e) => {
                  setIsbuffer(false);
                }}
          onProgress={(data) => {
                 // console.log(data)
                   if (data.playableDuration !== 0){
                        setIsbuffer(true)
                   } else {
                       setIsbuffer(false)
                    }
          }}
          
          minLoadRetryCount={5} // retry 5 times
                
                
        /> 

        {isShowOverlay || isPlay===false ? 
        
          <View style={styles.overlay}>
            
            

          </View>
          :
          <></>
        }

        {isBuffer &&
          
           <ActivityIndicator style={styles.loader} size={"large"} color={Colors.purple} />
        
        }

        {isBuffer===false && isPlay===false ?
          
           
             <Icon 
                name="play" 
                color='#ffff'
                size={55}
                style={styles.play}
                onPress={() => {
                    clearTimeout(timerRef.current);
                   setIsPlay(true);
                   setIsShowOverlay(true);
                  
                   overlayTimeout();
                  
                }}
              />

          :
          <></>
        }


         {isBuffer===false && isPlay===true &isShowOverlay ?
          
           
              <Icon 
                name="pause" 
                color='#ffff'
                size={55}
                style={styles.play}
            onPress={() => {
                  
                  clearTimeout(timerRef.current);
                  setIsPlay(false);
                   overlayTimeout();
                }}
              />

          :
          <></>
        }

        {isPlay===false || isShowOverlay ?
          
           
              <Icon 
                name="fullscreen" 
                color='#ffff'
                size={35}
                style={styles.full}
                onPress={() => {
                  
                  onFullscreenEnter();
                }}
              />

          :
          <></>
        }
        
       
           
      </View>
      </TouchableOpacity>
    );
}

export default LivePlayer;

const styles = StyleSheet.create({
 
    container:{
      height:width/1.75,
      width:window.width,
      backgroundColor:"#000"
 
     
    },
    player:{

        width:"100%",
        height:"100%",
        flex:1,
     
        
  },
  loader: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    top:(width/1.75)/2.3
    
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#000",
    opacity:0.2
  },
  play: {
    
     position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    top: (width / 1.75) / 2.6,
    zIndex:10
  },
  full: {
    
    position: "absolute",
    right: 10,
    bottom:10
  }

  });