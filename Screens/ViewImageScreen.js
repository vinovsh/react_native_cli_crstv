import React from 'react';
import {View,Text,Button, StyleSheet,Dimensions,Animated, Image,TouchableOpacity} from "react-native";
import ProgressiveImage from '../Components/ProgressiveImage';
import { PinchGestureHandler,State } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const width=Dimensions.get("window").width;
const height=Dimensions.get('window').height;
const ViewImageScreen = ({route,navigation}) => {

 console.log(route.params)
 
 React.useEffect(() => {
  navigation.setOptions({ title:route.params.title });

}, []);
 const scale=new Animated.Value(1)
 const onZoomEventFunction=Animated.event(
   
     [{

        nativeEvent:{scale:scale}
     }],
     {
       useNativeDriver:true
     }
 
 )

 const onZoomStateChangeEvent=(event)=>{

     if(event.nativeEvent.oldState==State.ACTIVE){
         Animated.spring(
          scale,
           {

            toValue:1,
            useNativeDriver:true,

           }


         ).start()
     }

 }
    return (
        <View style={styles.container}>
          
            <View style={styles.image_box}>
              <PinchGestureHandler
                
                onGestureEvent={()=>{onZoomEventFunction}}
                onHandlerStateChange={(event)=>{onZoomStateChangeEvent(event)}}
              
              >
                {/* <ProgressiveImage
                   defaultImageSource={require('../assets/images/loadImage.png')}
                   source={route.params.img_url}
                   style={{ width:"100%",flex:1,transform:[{scale:scale}]}}
              
                />  */}
                <Animated.Image
                    source={{uri:route.params.img_url.uri}}
                    style={{ width:"100%",flex:1,transform:[{scale:scale}]}}
                />
         </PinchGestureHandler>
            </View>
           <View style={styles.download_box}>
             
              <View style={styles.download_circle}>
                <TouchableOpacity>    
                  <Feather 
                    name="download"
                    color="white"
                    size={25}
                  />
                  </TouchableOpacity>
              </View>
             
          </View> 
           
          
        </View>
    );
}

export default ViewImageScreen;
const styles = StyleSheet.create({
  container:{

    flex:1,
    
    flexDirection:"column",
   justifyContent:"center",
   alignItems:"center",
  
   backgroundColor:"black",
 
   
    
    
    
    
  },
  
  image_box:{
    width:"100%",
    height:width,
  
  },
  download_box:{
   /*  position:"relative",
    bottom:30,
    left:width/3,
    justifyContent:"center",
    alignItems:"center" */
    marginTop:20,
    width:"100%",
   
    

  },
  download_circle:{
     justifyContent:"flex-end",
     alignItems:"flex-end",
     marginRight:"10%"
     
  }

})