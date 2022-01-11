import React,{useState}  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import Colors from "../ColorPalet";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {useTheme} from 'react-native-paper';

const width = Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const StatusVideoCard =props=>{
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  const [isBufferinline, setisBufferinline] = useState(true);
    return (
        <View>
           <Text style={[styles.CategoryTitle,{color:colors.custom_text}]}>{props.title}</Text>
           <TouchableOpacity onPress={()=>{navigation.navigate('whatsapp_status',{ title: 'Whatsapp Status',img_url:props.videoSource })}} style={styles.playerContainer}>
               <Video
                 style={styles.player}
                
         
                 source={props.videoSource}
                 muted={true}
                 resizeMode="cover"
                 paused={false}
            
                 onLoadStart={(e) => {
            
                  setisBufferinline(true);

                }}
          
                onLoad={(e) => {
                  setisBufferinline(false);
                }}
                
        
        
          /> 
         
          <View style={{ width: "100%", height: "100%", zIndex: 10, position: "absolute" }}></View>
          
          {isBufferinline &&
              <ActivityIndicator style={styles.loader} size={"large"} color={Colors.purple} />
         
          }
            
        </TouchableOpacity>
     
          

        </View>
      );



}

export default StatusVideoCard;



const styles = StyleSheet.create({
 
   
    player:{
    borderRadius: 15,
    height: "100%",
      width:"100%"
    },
    playerContainer:{
    
      width:width/2.3,
      height:width/2.3,
      borderRadius:15,
      backgroundColor:Colors.theamColor,
    
      shadowColor:Colors.shadow,
      elevation:7,
      margin:10,
      padding:0,
        
    },
    CategoryTitle:{
      marginTop:10,
        
      fontSize:15,
     
      paddingHorizontal:15,
      fontFamily:"Montserrat-SemiBold",
    
      
    
        
  },
  loader: {
    position: "absolute",
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    alignContent:'center',
    
   
    zIndex:75,
   // top:(height)/2,
    top: (width / 2.3)/2.4,
    
  },
   
  });


