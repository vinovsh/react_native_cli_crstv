import React,{useEffect,Component } from 'react';
import {View,Text,Button,SafeAreaView,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity,StatusBar} from "react-native"
import { Title } from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';
import Colors from '../ColorPalet';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import InViewPort from 'react-native-inviewport';

const width=Dimensions.get('screen').width;
const height=Dimensions.get('window').height;
class ReelsContainer extends Component {
  constructor (props) {
    super(props);
   
    this.state = {
      isLike: this.props.item.isLike,
   
    };

   
  }

  
  render () {
 



   const playVideo=()=>{ 
     alert("j")
   }
  const likeButton=()=>{
    if(this.state.isLike==true){
      this.setState({ isLike:false })
      
    }else{

      this.setState({ isLike:true })

      
    } 
  

  }
    return (

      <SafeAreaView >
       <View  style={[styles.container,{width,height:height}]}>
    
         <VideoPlayer
                
                
                 height={height}
            
                 source={{
                    uri: this.props.item.video,
                      
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
                 paused={this.props.active_id==this.props.item.id || this.props.index==0 ? false : true}
                 
        
        
              /> 
            

              <View  style={styles.optionsCard}>
                  <TouchableOpacity onPress={()=>{likeButton()}}  style={{flexDirection:"column",alignItems:'center'}}>
                     <Feather 
                       name="thumbs-up"
                       color={this.state.isLike?"#0BD175" :'white'}
                       size={30}
                     />
                     <Text style={{color:"white"}}>{this.props.item.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity   style={{flexDirection:"column",alignItems:'center',marginTop:10}}>
                     <Icon 
                       name="share"
                       color='white'
                       size={30}
                     />
                    
                  </TouchableOpacity>

              </View>

              <View style={styles.profileCard}>
                 <Title style={styles.description}>{this.props.item.title}</Title>
                 <View style={styles.usercard}>
                       <Image style={styles.pro_img} source={{uri:this.props.item.profile}}/>
                       <Text numberOfLines={1}  style={styles.pname}>{this.props.item.name}</Text> 
                 </View>
              </View>
       </View>
       </SafeAreaView>
    );
                }
}

export default ReelsContainer;

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#000",
    
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