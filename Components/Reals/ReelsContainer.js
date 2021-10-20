import React,{useEffect} from 'react';
import {View,Text,Button,SafeAreaView,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity} from "react-native"
import { Title } from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';
import Colors from '../ColorPalet';
import Feather from 'react-native-vector-icons/Feather';
//import InViewPort from 'react-native-inviewport';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const ReelsContainer = ({route,item}) => {


  const [isLike,setIsLike]=React.useState(item.isLike);
  const [isPlay,setIsPlay]=React.useState(false);
  
   const playVideo=()=>{
     alert("j")
   }
  const likeButton=()=>{
    if(isLike==true){
        setIsLike(false);
      
    }else{

        setIsLike(true);
      
    } 
  

  }
    return (
       <View onChangeVisibleRows={()=>{alert('l')}} style={[styles.container,{width,height}]}>
            {/* <InViewPort onChange={()=>{playVideo()}}> */}
          <VideoPlayer
                 style={styles.player}
                
                
            
                 source={{
                    uri: item.video,
                      
                 }}
                 muted={false}
                 resizeMode="contain"
                 disablePlayPause
                 disableSeekbar
                 disableVolume
                 disableTimer
                 disableBack
                 disableFullscreen
                 controls={false}
                 posterResizeMode="contain"
                 repeat={true}
                 showOnStart={false}
                 controlTimeout={1}
                 paused={isPlay}
                 
        
        
              />
             {/*  </InViewPort> */}

              <View  style={styles.optionsCard}>
                  <TouchableOpacity onPress={()=>{likeButton()}}  style={{flexDirection:"column",alignItems:'center'}}>
                     <Feather 
                       name="thumbs-up"
                       color={isLike?"#0BD175" :'white'}
                       size={30}
                     />
                     <Text style={{color:"white"}}>{item.likesCount}</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.profileCard}>
                 <Title style={styles.description}>{item.description}</Title>
                 <View style={styles.usercard}>
                       <Image style={styles.pro_img} source={{uri:'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}}/>
                       <Text numberOfLines={1}  style={styles.pname}>{item.name}</Text> 
                 </View>
              </View>
       </View>
    );
}

export default ReelsContainer;

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    },
    profileCard:{
        width:width/1.2,
      
      
        position:"absolute",
        bottom:0,
        flexDirection:"column",
        justifyContent:"flex-start",
        left:0
    },
    description:{
        fontFamily:"Montserrat-SemiBold",
        fontSize:17,
        paddingHorizontal:15,
        color:Colors.theamColor,
    },
    usercard:{
        paddingHorizontal:15,
        marginVertical:10,
        flexDirection:"row",
        alignItems:"center"
    },
    pro_img:{
        width:40,
        height:40,
        borderRadius:40
    },
    pname:{
        paddingHorizontal:10,
        fontFamily:"Montserrat-Bold",
        fontSize:18,
        color:Colors.theamColor,
    },
    optionsCard:{
        position:"absolute",
        width:60,
        flexDirection:"column",
        right:0,
        justifyContent:"center",
        alignItems:"center",
       
    }
})