import React from 'react';
import {View,Text,Button, StyleSheet,Dimensions,Animated, Image} from "react-native";
import ProgressiveImage from '../Components/ProgressiveImage';
import { PinchGestureHandler,State } from 'react-native-gesture-handler';

const width=Dimensions.get("window").width;
const height=Dimensions.get('window').height;
const ViewImageScreen = ({route,navigation}) => {

 console.log(route.params)
 navigation.setOptions({ title:route.params.title });
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
          
        </View>
    );
}

export default ViewImageScreen;
const styles = StyleSheet.create({
  container:{

    flex:1,
    
    flexDirection:"row",
   justifyContent:"center",
   alignItems:"center",
  
   backgroundColor:"black"
   
    
    
    
    
  },
  
  image_box:{
    width:"100%",
    height:width,
  
  }
})