import React, { useEffect ,useState,useRef} from "react";
import {View,Text,Button,Dimensions,StyleSheet,BackHandler,StatusBar,ActivityIndicator,TouchableOpacity} from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Colors from '../Components/ColorPalet';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';





const ChannelPlayerScreen = (props) => {


    const timerRef = useRef(null);

    const [isBuffer, setIsbuffer] = useState(true);
    const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  
  const [refresh, setrefresh] = useState(true);

    useEffect(() => {
        Orientation.lockToLandscape();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
      

      setrefresh(!refresh);
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
      <TouchableOpacity onPress={() => { overlayClick() }} activeOpacity={1}>
        <StatusBar hidden={true} style="black" backgroundColor="#00000040" />
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
                
                source={{ uri: props.route.params.item.channel_url }}   
                
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
                
            
            onBuffer={(data) => {
                  console.log(data)
                 
                        setIsbuffer(true)
                  
            }} 
            
            onError={(e) => {
              console.log(e);
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
          

           {isPlay===false || isShowOverlay ?
          
           
              <Icon 
                name="chevron-left" 
                color='#ffff'
                size={45}
                style={styles.back}
                onPress={() => {
                  
                  BackNavigation();
                }}
              />

          :
          <></>
        }
        
       
           
      </View>
      </TouchableOpacity>
    );
}

export default ChannelPlayerScreen;

const styles = StyleSheet.create({
 
    container:{
      height:"100%",
      width:"100%",
      
        top: 0,
    left: 0,
    bottom: 0,
    right: 0,
      backgroundColor:"#000"
 
     
    },
    player:{

         width:"100%",
        height:"100%", 
      
     
        
  },
    
  loader: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    top:"45%"
    
  },
  overlay: {
     width: "100%",
    height: "100%", 
    position: "absolute",
   
  },
  play: {
    
     position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    top: "45%",
    zIndex:10
  },
  full: {
    
    position: "absolute",
    right: 10,
    bottom:20
  },

  back: {
    
    position: "absolute",
    left: 10,
    top:20
  }

  });