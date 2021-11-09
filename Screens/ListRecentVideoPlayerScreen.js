import React,{Component} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,StatusBar,StyleSheet,Dimensions,FlatList,TouchableOpacity,Alert } from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import VideoCardPapulate from '../Components/Cards/VideoCardPapulate';

//loader
import LoadingScreen from './LoadingScreen';
import LoadmoreIndicator from '../Components/LoadmoreIndicator';

const width=Dimensions.get('window').width;
const height=Dimensions.get('screen').height;
class ListRecentVideoPlayerScreen extends Component {

    constructor(props) {
 
        super(props);
        this.state = {
           portrait:true,
           statusBar:StatusBar.currentHeight,
           isStatusbarHidden:false,
           videoUrl:this.props.route.params.video,
           title:this.props.route.params.name,
           token:this.props.route.params.userToken,
           id:this.props.route.params.id,
           apidata:null,
           loading:true,
           currentPage:1,
           moreloading:false


        }
  
    
       
      }
     
      getdata=async ()=>{
        let that = this;
        try{
         
          await axios.post(config.BASE_URL+'recent_videos?page='+that.state.currentPage, {
               token: this.state.token,
               video_id:this.state.id
              
             })
            
             .then(function (response) {
             
                 var data=response.data;
              
                 if(data.error==false){
                 
                 if(that.state.apidata){
                  
                     var append_data=that.state.apidata.recent_videos.data.concat(data.recent_videos.data);
                     data.recent_videos.data=append_data;
                    
                   that.setState({
                      apidata: data,
                    });

                   
                   
                  }else{ 
                   
                    that.setState({
                      loading: false,
                      apidata:data
                    });

                  }  
                  
                  that.setState({
                    loading: false,
                    moreloading:false
                  });
                  
                 }else{
                    
                  Alert.alert('Error Message!', JSON.stringify(data.message), [
                    {text: 'Okay'}
                   ]);
                   return;
                  }
             })
             .catch(function (error) {
            
                    Alert.alert('Error Message!', JSON.stringify(error.message), [
                     {text: 'Okay'}
                    ]);
                    return;
             });
          
       }catch(e){
       
           Alert.alert('Error Message!', JSON.stringify(e.message), [
             {text: 'Okay'}
           ]);
           return;
       }
      }
      
      componentDidMount = () => {
        
        this.getdata();
      }
   
     
      
    render () {
        
     
       
       

        const onFullscreenEnter=()=>{
            this.setState({
                portrait: false,
                statusBar:0,
                isStatusbarHidden:true
               
              });
              Orientation.lockToLandscape();
        }
  
       const onFullscreenExit=()=>{
        this.setState({
            portrait: true,
            statusBar:StatusBar.currentHeight,
            isStatusbarHidden:false
          });
          Orientation.lockToPortrait();
        }

        const OnchangeVideoController=(item)=>{
          this.setState({
            title:item.title,
            videoUrl: item.video_link,
            
           
           
          });
         
        }

        
       const BackNavigation=()=>{
        this.props.navigation.goBack(null)

      }
        
      onEnd=()=>{
        var that=this;
        var c_page=this.state.apidata.recent_videos.current_page;
        var l_page=this.state.apidata.recent_videos.last_page;
      
        if(c_page<l_page){
         
          that.setState({
           moreloading: true,
           currentPage:c_page+1,
          },this.getdata);

         
        }
      }
      
   
    return (
      <>
      {this.state.loading ?(
      
          <LoadingScreen color="#fff"/>

        ):(

      < >
        <View style={[styles.container,{marginTop:this.state.statusBar}]}>
            <StatusBar hidden={this.state.isStatusbarHidden} backgroundColor={"#fff"} barStyle="dark-content"/>
             <View style={this.state.portrait==true ?styles.playerBox_portrait:styles.playerBox_landscap}>
              <VideoPlayer
                ref={(ref) => {
                    this.player = ref
                  }}
                 style={this.state.portrait==true ?styles.player_portrait:styles.player_landscape}
                 source={{
                    uri: this.state.videoUrl,
                    //type: 'm3u8'
                    // overrideFileExtensionAndroid: 'm3u8' 
                 }}
                 repeat={true}
                 title={this.state.title}
                 fullscreen={false}
                 resizeMode="contain"
                 onEnterFullscreen={()=>{onFullscreenEnter()}}
                 onExitFullscreen={()=>{onFullscreenExit()}}
        
                
                 paused={false}
                 onBack={()=>{BackNavigation()}}
             
           
           
            />
            {/* <View style={styles.videoController}></View> */}
           </View>
           <FlatList

             style={styles.container}
             data={this.state.apidata.recent_videos.data}
           
            
             renderItem={({item}) => (

                <TouchableOpacity activeOpacity={0.8} onPress={ () =>OnchangeVideoController(item)}>
                     <VideoCardPapulate title={item.title} navigate_to="ListRecentVideoPlayerScreen" source={{uri:item.thumpnail}} item={item} />
  
               </TouchableOpacity>
  
           )}
             keyExtractor={(item) => item.id}
           
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}
             onEndReached={()=>{onEnd()}}
             //onEndReachedThreshold={0}
             numColumns={2}
             ListFooterComponent={ this.state.moreloading ?(<LoadmoreIndicator /> ):(<></>)}
            />
        </View>

        </>
        )}
        </>
    )
   }
}

export default ListRecentVideoPlayerScreen;

const styles = StyleSheet.create({
   container:{
  
    flex:1
   } ,
   playerBox_portrait:{
     width:"100%",
     height:width/1.8,
     backgroundColor:"#fff"
     
   },
   playerBox_landscap:{
    width:"100%",
    height:"100%",
    position:"absolute",
    zIndex:5,
  
 
    
    
  },
  
})