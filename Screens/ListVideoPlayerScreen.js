import React,{Component} from 'react';
import {View,Text,Button,StatusBar,StyleSheet,Dimensions,FlatList,TouchableOpacity } from "react-native";
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import VideoCardPapulate from '../Components/Cards/VideoCardPapulate';


const width=Dimensions.get('window').width;
const height=Dimensions.get('screen').height;
class ListVideoPlayerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
           portrait:true,
           statusBar:StatusBar.currentHeight,
           isStatusbarHidden:false,
           videoUrl:this.props.route.params.video
        }
  
    
       
      }

    
   
    
      
    render () {
        
        console.log(this.props.route.params.video)
       
        const DATA = [
            {
              id: 1,
              name:"VBS Ebisode 1",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4kRAk8V_bpmRKZu-_QAeSKXwPW0jm0AJdg&usqp=CAU",
              video:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            },
            {
              id: 2,
              name:"VBS Ebisode 2 with sepcial Event",
              image:"https://faithisland.org/wp-content/uploads/2015/07/Image-02-Trust-mini.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
             
            },
            {
              id:3,
              name:"VBS Ebisode 3",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcHPnZyGRSlRRxFUCUxdSrI9TATR8N4tW6w&usqp=CAU",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             
            },
            
            {
              id:4,
              name:"VBS Ebisode 4",
              image:"https://i.pinimg.com/736x/63/ac/5c/63ac5c248b4d021d478e72ff445f97e8--jesus-saves-christian-quotes.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
             
            }
            ,
            {
              id:5,
              name:"VBS Ebisode 5",
              image:"https://i.pinimg.com/474x/b4/f3/01/b4f301fcd57dfdb23047b6b6baacc844.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             
            }
            ,
            {
              id:6,
              name:"VBS Ebisode 6",
              image:"https://dogtrainingobedienceschool.com/pic/2257231_full-sunday-morning-quotes-from-the-bible-55-good-morning-bible-quotes-images-wallpaper.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
             
            }
            ,
            {
              id:7,
              name:"VBS Ebisode 7",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0OQBCQcy0qk8xhMR091ghTuTPpSAwxIaP-A&usqp=CAU",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             
            }
            ,
            {
              id: 8,
              name:"VBS Ebisode 2 with sepcial Event",
              image:"https://faithisland.org/wp-content/uploads/2015/07/Image-02-Trust-mini.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
             
            },
            {
              id:9,
              name:"VBS Ebisode 3",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcHPnZyGRSlRRxFUCUxdSrI9TATR8N4tW6w&usqp=CAU",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             
            },
            
            {
              id:10,
              name:"VBS Ebisode 4",
              image:"https://i.pinimg.com/736x/63/ac/5c/63ac5c248b4d021d478e72ff445f97e8--jesus-saves-christian-quotes.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
             
            }
            ,
            {
              id:11,
              name:"VBS Ebisode 5",
              image:"https://i.pinimg.com/474x/b4/f3/01/b4f301fcd57dfdb23047b6b6baacc844.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             
            }
            ,
            {
              id:12,
              name:"VBS Ebisode 6",
              image:"https://dogtrainingobedienceschool.com/pic/2257231_full-sunday-morning-quotes-from-the-bible-55-good-morning-bible-quotes-images-wallpaper.jpg",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
             
            }
            ,
            {
              id:13,
              name:"VBS Ebisode 7",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0OQBCQcy0qk8xhMR091ghTuTPpSAwxIaP-A&usqp=CAU",
              video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
             
            }
          ];

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
        

        const onRefresh = () => {
            setIsFetching(true);
            fetchData();
          };
   
    return (
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
                 title={"Live"}
                 fullscreen={false}
                 resizeMode="contain"
                 onEnterFullscreen={()=>{onFullscreenEnter()}}
                 onExitFullscreen={()=>{onFullscreenExit()}}
        
              
                 paused={false}
             
           
           
            />
            {/* <View style={styles.videoController}></View> */}
           </View>
           <FlatList

             style={styles.container}
             data={DATA}
           
            
             renderItem={({item}) => (

                <TouchableOpacity activeOpacity={0.8} onPress={ () => alert('k')}>
                     <VideoCardPapulate title="video" navigate_to="ListVideoPlayerScreen" source={{uri:item.image}} item={item} />
  
               </TouchableOpacity>
  
           )}
             keyExtractor={(item) => item.id}
           
             showsVerticalScrollIndicator={true}
             numColumns={2}
            />
        </View>
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
     height:480/2,
     backgroundColor:"#fff"
     
   },
   playerBox_landscap:{
    width:"100%",
    height:"100%",
    position:"absolute",
    zIndex:5,
  
 
    
    
  },
   player_portrait:{
    //transform: [{ rotateZ: '90deg'}],
   // width:height,
   // height:width,
  
   },
   player_landscape:{
    //transform: [{ rotateZ: '90deg'}],
   // width:height,
   // height:width,
  
   },
  /*  videoController:{
       width:"100%",
       height:"100%"
   } */
})