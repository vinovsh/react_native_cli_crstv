import React,{useEffect,Component } from 'react';
import {View,Text,SafeAreaView,StyleSheet,Image,Dimensions,TouchableOpacity,StatusBar,ToastAndroid,ActivityIndicator} from "react-native"
import { Title } from 'react-native-paper';
import Video from 'react-native-video';
import Colors from '../ColorPalet';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImgToBase64 from 'react-native-image-base64';
import Share from 'react-native-share';
import config from '../../config/config';
import axios from 'axios';


//import InViewPort from 'react-native-inviewport';

const width=Dimensions.get('screen').width;
const height=Dimensions.get('window').height;
class ReelsContainer extends Component {
  constructor (props) {
    super(props);
   
    this.state = {
      isLike: this.props.item.isLike,
      totalLikes: this.props.item.likes,
      isBuffer:true,
   
    };

   
  }

  
  render () {
 

  

   const playVideo=()=>{ 
     alert("j")
   }
  const likeButton=()=>{
  /*   if(this.state.isLike==true){
      this.setState({ isLike:false })
      
    }else{

      this.setState({ isLike:true })

      
    }  */

    getdata();
  

  }
  
  const getdata=async ()=>{
      var that=this;
    try{
            
      await axios.post(config.BASE_URL+'likes_controll', {
           token: this.props.token,
           reel_id:this.props.item.id
          
          
         })
        
         .then(function (response) {
             var data=response.data;
          
             if(data.error==false){
            
              that.setState({ isLike:data.isLike });
              that.setState({ totalLikes:data.total_likes });
              
              
             }else{
                
              ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
              }
         })
         .catch(function (error) {
        
          ToastAndroid.show('Network unavailable', ToastAndroid.SHORT);
         
         });
      
   }catch(e){
      ToastAndroid.show('Network unavailable', ToastAndroid.SHORT);
   }
  }

  const shareImageB64=(base64String,title,id)=>{

    const shareOptions={
      message:title+" "+"http://crstv.in/reels/"+id,
      url:"data:image/jpeg;base64,"+base64String
    }

    Share.open(shareOptions)
    .then((res) => {
     // console.log(res);
    })
    .catch((err) => {
     // err && console.log(err);
    });
  }

  const shareReel=(data)=>{

      ImgToBase64.getBase64String(data.image)
      .then(base64String => shareImageB64(base64String,data.title,data.id))
      .catch(err => doSomethingWith(err));
     
  
    
    }
    
 
    return (

   
       <View  style={[styles.container,{width,height:height}]}>
    
         <Video 
                
                
            style={styles.player}
          
            source={{uri: this.props.item.video}} 
            muted={false}
            resizeMode='contain'
                
            paused={this.props.active_id==this.props.item.id || this.props.index==0 ? false : true}
                 
             onLoadStart={(e) => {
            
               this.setState({ isBuffer:true });

            }}
          
            onLoad={(e) => {
               this.setState({ isBuffer:false });
          }}
          
          repeat={true}
        
        /> 
            
               <View style={styles.headerCard}>

                      <Feather 
                       name="arrow-left"
                       color={'white'}
                       size={30}
                       onPress={()=>{
                         this.props.backToHome();
                       }}
                     />
                     <Text style={{fontSize:21,paddingLeft:10,color:'white'}}>Reels</Text>

               </View>
              <View  style={styles.optionsCard}>
                  <TouchableOpacity onPress={()=>{likeButton()}}  style={{flexDirection:"column",alignItems:'center'}}>
                     <Feather 
                       name="thumbs-up"
                       color={this.state.isLike?"#0BD175" :'white'}
                       size={30}
                     />
                    
                     <Text style={{color:"white"}}>{this.state.totalLikes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity   style={{flexDirection:"column",alignItems:'center',marginTop:10}}>
                     <Icon 
                       name="share"
                       color='white'
                       size={30}
                       onPress={()=>{shareReel(this.props.item)}}
                     />
                    
                  </TouchableOpacity>

        </View>
        
         {this.state.isBuffer &&
          
           <ActivityIndicator style={styles.loader} size={"large"} color={Colors.purple} />
        
        }

              <View style={styles.profileCard}>
                 <Title style={styles.description}>{this.props.item.title}</Title>
                 <View style={styles.usercard}>

                 
                      {this.props.item.profile===null?
                      <Image style={styles.pro_img} source={require('../../assets/images/profile.png')}/>
                   
                   :
                      <Image style={styles.pro_img} source={{uri:this.props.item.profile}}/>
                    
                    }
                      
                       <Text numberOfLines={1}  style={styles.pname}>{this.props.item.name}</Text> 
                 </View>
              </View>
       </View>
     
    );
                }
}

export default ReelsContainer;

const styles = StyleSheet.create({
    container:{
     // flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#000",
    
  },
   player:{

        width:"100%",
        height:"100%",
        flex:1,
     
        
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
       
    },
    headerCard:{
     
      position: 'absolute',
     //  height:50,
      top:0,
      width:'100%',
    
      marginTop:StatusBar.currentHeight,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      paddingLeft:15
  },
    loader: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    top:(height)/2
    
  }
})