import React,{useState} from 'react';
import {View,Text,Button, StyleSheet,Dimensions,Animated, Image,TouchableOpacity,PermissionsAndroid,Platform,ActivityIndicator} from "react-native";
import ProgressiveImage from '../Components/ProgressiveImage';

import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';
import Colors from '../Components/ColorPalet';



const width=Dimensions.get("window").width;
const height=Dimensions.get('window').height;
const StatusVideoScreen = ({route,navigation}) => {

const [isBuffer, setIsbuffer] = useState(true);

 
 React.useEffect(() => {
  navigation.setOptions({ title:route.params.title });

}, []);
 const scale=new Animated.Value(1)


 /* image download section */

    const checkPermission=async()=>{
       
      if(Platform.OS=="ios"){
         downloadImage();
      }else{

        try {

          const granted=await PermissionsAndroid.request(
            
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title:"Srorage Permission Required",
              message:"App needs access to your storage to download files"
            }

          )
         
          if(granted==PermissionsAndroid.RESULTS.GRANTED){

            // console.log("storage permission granted");
             downloadImage();
          }else{
            alert("storage permission not granted");
          }
          
        } catch (error) {
          // console.warn(error)
        }

      }

    }

    const downloadImage=()=>{
     let date=new Date();
     let image_url=route.params.img_url.uri;
     let ext=getExtention(image_url);
     ext='.'+ext[0];
     const {config,fs}=RNFetchBlob;
      //get congic and fs from RNFetchBlob
     let pictureDir=RNFetchBlob.fs.dirs.PictureDir + '/Crstv_'+Math.floor(date.getTime()+date.getSeconds() /2)+ext
   
     let options={
       fileCatch:true,
       addAndroidDownloads:{
            //related to the android only
            useDownloadManager:true,
            notification:true,
            path:pictureDir,
            description:"Image"
       }
     }

     config(options)
     .fetch('GET',image_url)
     .then(res=>{
        // console.log('res->',JSON.stringify(res));
         alert("Status downloaded successfully")
     })
    }

    const getExtention=filename=>{
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename):undefined
    }

 /* end image download section */





    return (
        <View style={styles.container}>
          
            <View style={styles.image_box}>
            <Video
                 style={styles.player}
                
                
            
                 source={{
                    uri: route.params.img_url.uri,
                      
                 }}
                 muted={false}
                resizeMode="contain"
            
                onLoadStart={(e) => {
            
                  setIsbuffer(true);

                }}
          
                onLoad={(e) => {
                  setIsbuffer(false);
            }}
            repeat={true}
                
        
              />  
            </View>
           <View style={styles.download_box}>
             
              <View style={styles.download_circle}>
                <TouchableOpacity onPress={()=>{checkPermission()}}>    
                  <Feather 
                    name="download"
                    color="white"
                    size={25}
                  />
                  </TouchableOpacity>
              </View>
             
        </View> 
        
        {isBuffer &&
          
           <ActivityIndicator style={styles.loader} size={"large"} color={Colors.purple} />
        
        }
           
          
        </View>
    );
}

export default StatusVideoScreen;
const styles = StyleSheet.create({
  container:{

    flex:1,
    
    flexDirection:"column",
   justifyContent:"center",
   alignItems:"center",
  
   backgroundColor:"black",
 
  },
  player:{
    flex:1
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
     
  },
  loader: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    top:(height/2.3)
    
  },

})