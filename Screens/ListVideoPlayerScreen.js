import React,{Component} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,StatusBar,StyleSheet,Dimensions,FlatList,TouchableOpacity,Alert } from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import VideoCardPapulate from '../Components/Cards/VideoCardPapulate';
import YoutubePlayer from "react-native-youtube-iframe";
import VideoTitle from '../Components/VideoTitle';

//loader
import LoadingScreen from './LoadingScreen';
import LoadmoreIndicator from '../Components/LoadmoreIndicator';
import VideoLoader from '../Components/skeloton/VideoLoader';

const width=Dimensions.get('window').width;
const height=Dimensions.get('screen').height;

class ListVideoPlayerScreen extends Component {

    constructor(props) {

     
 
        super(props);
     
        this.state = {
           portrait:true,
           statusBar:StatusBar.currentHeight,
           isStatusbarHidden:false,
           videoUrl:this.props.route.params.item.video_link,
           title:this.props.route.params.item.title,
           token:this.props.route.params.userToken,
           id:this.props.route.params.item.id,
           apidata:null,
           loading:false,
           currentPage:1,
           moreloading:false,
           videoloading:true,
           video_type:this.props.route.params.item.type,
           category_id:this.props.route.params.item.category_id


        }
  
   
       
      }
     
      getdata=async ()=>{
        let that = this;
        try{
         
          await axios.post(config.BASE_URL+'category_videos?page='+that.state.currentPage, {
               token: this.state.token,
               video_id:this.state.id,
               category_id:this.state.category_id
              
             })
            
             .then(function (response) {
             
                 var data=response.data;
              
                 if(data.error==false){
                 
                 if(that.state.apidata){
                  
                     var append_data=that.state.apidata.category_videos.data.concat(data.category_videos.data);
                     data.category_videos.data=append_data;
                    
                   that.setState({
                      apidata: data,
                      videoloading:false,
                    });

                   
                   
                  }else{ 
                   
                    that.setState({
                      loading: false,
                      videoloading:false,
                      apidata:data
                    });

                  }  
                  
                  that.setState({
                    loading: false,
                    videoloading:false,
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
            video_type:item.type,
            currentPage:1,
            apidata:"",
            videoloading:true,
            id:item.id
           
           
          },this.getdata);
        
        }

        
       const BackNavigation=()=>{
        Orientation.lockToPortrait();
        this.props.navigation.goBack(null)

      }
        
      onEnd=()=>{
        var that=this;
        var c_page=this.state.apidata.category_videos.current_page;
        var l_page=this.state.apidata.category_videos.last_page;
      
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
              
             {this.state.video_type !="youtube" ?(
      
                <VideoPlayer
                   ref={(ref) => {
                      this.player = ref
                   }}
                   style={this.state.portrait==true ?styles.player_portrait:styles.player_landscape}
                   source={{
                     uri: this.state.videoUrl,
                    
                   }}
                   repeat={true}
                   title=""
                   fullscreen={false}
                   resizeMode="contain"
                   onEnterFullscreen={()=>{onFullscreenEnter()}}
                   onExitFullscreen={()=>{onFullscreenExit()}}
        
                
                   paused={false}
                   onBack={()=>{BackNavigation()}}
             
           
           
               /> 

           ):(

            < >
              

             <YoutubePlayer
               height={300}
               play={true}
               showtitle={false}
               videoId={this.state.videoUrl}
               style={this.state.portrait==true ?styles.player_portrait:styles.player_landscape}
               onFullScreenChange={(e)=>{if(e){onFullscreenEnter()}else{onFullscreenExit()}}}
             />
             
              </>
            )}
           </View>
          <VideoTitle title={this.state.title} />

          
           {this.state.videoloading ?(
              <VideoLoader  />

           ):(

              < >
                  
            <FlatList

             style={styles.container}
             data={this.state.apidata.category_videos.data}
           
            
             renderItem={({item}) => (

                <TouchableOpacity activeOpacity={0.8} onPress={ () =>OnchangeVideoController(item)}>
                     <VideoCardPapulate title={item.title} navigate_to="ListVideoPlayerScreen" source={{uri:item.thumpnail}} item={item} />
  
               </TouchableOpacity>
  
           )}
             keyExtractor={(item) => item.id}
           
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}
             onEndReached={()=>{onEnd()}}
             
             numColumns={2}
             ListFooterComponent={ this.state.moreloading ?(<LoadmoreIndicator /> ):(<></>)}
            /> 

</>
            )}
        </View>

        </>
        )}
        </>
    )
   }
}

export default ListVideoPlayerScreen;

const styles = StyleSheet.create({
   container:{
  
    flex:1
   } ,
   playerBox_portrait:{
     width:"100%",
     height:width/1.8,
     backgroundColor:"#000"
     
   },
   playerBox_landscap:{
    width:"100%",
    height:"100%",
    position:"absolute",
    zIndex:5,
    backgroundColor:"#000"
   
  }
 
  
})