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
           videoUrl:this.props.route.params.video,
           title:this.props.route.params.name,
        }
  
    
       
      }

    
   
     
      
    render () {
        
     
       
        const DATA = [
            {
              id: 1,
              name:"VBS Ebisode 1",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4kRAk8V_bpmRKZu-_QAeSKXwPW0jm0AJdg&usqp=CAU",
              video:"https://imdb-video.media-imdb.com/vi2571739673/1434659607842-pgv4ql-1616202880380.mp4?Expires=1635144658&Signature=tGam-0suz-yQn3ghhHY4mRap8tz9ZyFtrdMIEO2ProM-ZBNWp2gieMAKPEwyOYKrUcZArQhtuONOLuh82zK1UeB~B1oAJsOqKdVm22eYCNJhOpDQQ8Lj5swGCvKxbIHjC68aXGJYmHAA52JT4lXljvFt9vyHxpt713Y0FvF1FqBod2FiflVGyrsG-D8~kpzhPJ6yuIO8kBPQq6YdPylBzz~FeGPhGY7GIT1-3zgZQi19HwNeOs3sWuaySX2WVXfqNUm~I5fTek10rXIZLyL6mjjvPUF33n3bTyy2jK~s84P79NNMcDwwiro02u1cLonm3jTMBXhp9mukZ7v-DeppYg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
            },
            {
              id: 2,
              name:"VBS Ebisode 2 with sepcial Event",
              image:"https://faithisland.org/wp-content/uploads/2015/07/Image-02-Trust-mini.jpg",
              video:'https://imdb-video.media-imdb.com/vi3234119705/1434659607842-pgv4ql-1621264669993.mp4?Expires=1635144847&Signature=DAuty52qoACcCKP0yHVoa-png~Kv0-n11~4R~yqlpLYcW29NV7XtTNeqr~7YS3P-2w8brsXQO53bFVg-9v8oDZvQhY~WBwlNTOeSv52l38roMWx9u7y21KKDGiwC5~AAUueW9nIi99i4jq044aomG3hhRm~BmgNikHlLQ3xxA4AciMrQHJFkW3y3c1x29c-t6Uo~TFEiNxxYgXcEKIhZl9huuELA6X0fyG0mJxtOCWW9HrxqQDRH514ozHouO7T4YFYamkL9Fpy4nWHkZ5fBYpJj7FZyIMkL~h75J6YaqW0F0SCUZzenFiurPXP7a~s1MPGbHWRpG3SmkjtrEYBdqQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            },
            {
              id:3,
              name:"VBS Ebisode 3",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcHPnZyGRSlRRxFUCUxdSrI9TATR8N4tW6w&usqp=CAU",
              video:'https://imdb-video.media-imdb.com/vi3765436441/1434659607842-pgv4ql-1616199566949.mp4?Expires=1635145098&Signature=Y5EkWphr8ZeOz6OROM1zrBtMFjjYr3zLE7XWpFQtwxbv1puGwlszgNDMxmthf~B-G6BDJI3plYCF22-aS-sUXi7HDig3Yl4kcVs6n6qVOvNO2d40DVch2xLJ3eKYKHguhJ1NC40vJkTZTXekpM5LySihbDmRPKaGnmxBK-mdKjX0r4k2h7fhU9IS3s9Byj8TSbGqwEWhi6Dyn28oeY8TYnm~cZs22Jpa-civZYMOv264bpnCDlo4d0CZEKJ37FqdOBaH60fgZE5xi~3xajwleojahY6qQnOb3UC2Mks6NoRcyo9v6dxiaXyCxq0ZETUdXGR~AclJ4mF2fHoYcKaYNw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            },
            
            {
              id:4,
              name:"VBS Ebisode 4",
              image:"https://i.pinimg.com/736x/63/ac/5c/63ac5c248b4d021d478e72ff445f97e8--jesus-saves-christian-quotes.jpg",
              video:'https://imdb-video.media-imdb.com/vi2978790169/1434659607842-pgv4ql-1528927513324.mp4?Expires=1635145323&Signature=YtjLvksLANOrh4G-DYnSdjgNNNQg47W6ebAPuWmrMfLLZl9EGEDrAaBLWI-pvPLSz6LLMeuuDe5FSJ0FpYW~KgUpw9A~ZHnZ6-Hs5XJjOHLjGaS9vNFTg63aHedJ1LNz-k2OmLkRS1OfE4kZaOamjPruynoiBhMRMVPRnW7mPMRd9s6uNfjBgeFoyZVcxn-bRd2Wg~qrXrn8ZQsXvzx04rsj8KZGNzjzZ-uHfKwAoh2UnW09C0JNTbz-LU3KR2p19ScoOkQ9fZOVTTYcf4U2Y8ej2190Lw-OhM89TPsugQ~AtXL2m4xwpwD6OlTecRMfs~6SVlT7mK99nT2Qly5j7Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            }
            ,
            {
              id:5,
              name:"VBS Ebisode 5",
              image:"https://i.pinimg.com/474x/b4/f3/01/b4f301fcd57dfdb23047b6b6baacc844.jpg",
              video:"https://imdb-video.media-imdb.com/vi3541811225/1434659607842-pgv4ql-1625164498887.mp4?Expires=1635146111&Signature=oVU9LedM6K2L2L8Tb3QUmSDNNPDUthI6OdFzOHiDxDVIYWKqzX8V9GKV9gaSt1n2FpN-dJW3yc5P9hcvZw4BSLUHjPWVx2AL72F5pRK3VT8LCK0kW8pd4MYCaLpiplVWTL8-qfDygRNFD3QGJYWcFpPzXlJeotHvDwLtoY-t3~qLJsiV1DBt4bslGkGyG391WQjemiBCBhGLly8picVArppDU5QfI~rqXYjNx4hWKpoEuAZE1db9cshKLA8LEIsdyH-gk7Cugic0q8eCERVST-48Mz-jWu0r9B~5l7xGuObT6~zBcBRNH6Uq8czFF7SO335qZY5Apg~Vo8~1dlJ-cw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
         
            }
            ,
            {
              id:6,
              name:"VBS Ebisode 6",
              image:"https://dogtrainingobedienceschool.com/pic/2257231_full-sunday-morning-quotes-from-the-bible-55-good-morning-bible-quotes-images-wallpaper.jpg",
              video:'https://imdb-video.media-imdb.com/vi1251719705/1434659607842-pgv4ql-1539813007924.mp4?Expires=1635146150&Signature=Q0UItijm16~-vFqVk7YUcNRkjQfVhYDyOEJeBE1q5tEy2EatOYqLSrD2Knh390lxZXfq8jYdF7h89q89tkWNLVsD5pmQpMhQmfREqtUW81eQEYtzrVAfOfazSU6TUCsuM72nksNzIlPov6NTKDwi082z2fvYkN52piFuB3Q3egW0Ld2wH9sv49KmPT10QNOls2qgNMihyH3lwApyCsoplSYfqhNNENwRyziA7NFn8WmWXj58qv6GDDKe4HrPSYUzvesK3wKmrz1WlV2x~gZgcMoUF3rNksmLdY57mS8QLtc8UYgURQyDjq5dg7YiwprI1rJWofcH3jdH66kfhat4nw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            }
            ,
            {
              id:7,
              name:"VBS Ebisode 7",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0OQBCQcy0qk8xhMR091ghTuTPpSAwxIaP-A&usqp=CAU",
              video:'https://imdb-video.media-imdb.com/vi44873241/1434659607842-pgv4ql-1473966844454.mp4?Expires=1635146206&Signature=bSbc5d2y4aFEj~apZU4ohIY1X51ULcq3U4FuTQo6RltPshAxeQKannTAzmzocDL2N4dK3d0Sn0GMpFReUwiw-AdYrqPJLeHmzn0JygChvcLqSf9pHuwu3QfDxI90EYCL29MVaFHbGEkL2-Tas030SbtiRItlCcpfIADaoSqQiUivpKZ6sFVetgFFZWcB83f7jfuB~4cW81~EAFwdJZ4S5pMbWyaPCUa4lnaUhquUlzGPGM3Y6Se51tWLkWhvSakmgrvhbzQMXNbLEMWkLzA2b1Pdr2Bxr7Nak17~fMXq~lK36rRNl3lqg~lgXTD6IX7Q6DHTM96kKns7t9LwpwMJqw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            }
            ,
            {
              id: 8,
              name:"VBS Ebisode 8 with sepcial Event",
              image:"https://faithisland.org/wp-content/uploads/2015/07/Image-02-Trust-mini.jpg",
              video:'https://imdb-video.media-imdb.com/vi66369305/1434659607842-pgv4ql-1564025888916.mp4?Expires=1635146233&Signature=mTE8OPLDubiW9xRFc4Dyp1~tGhRfspN8uJ5RJFRdWmJDBW-4duAmyil8SmnHkgU9u9yUNSAV5b4bGgmN~RUMhFH-l786SzrIX3ESmczvQdlsfe193k5oH-F8kpeU6ZtaWfIS-2Hub1e2-Gdhoco8aEcsHpT1NDSE67e~t10hZMdM7A0RgorvrIUPA8vq2Ed0IxecvipHa59-0uT2IYul80pssb0354BsPkyuWR5VN5Ty5ZPfjWE6K~PRYthZibm~hf9CSbOWMg1Sc8hZVILOs71WdBREMcyOCsKEyVjoSgfE0jr~ln5slgBEc1dCYbZch-sQKo-1Rb4IFuGoWouN5g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            },
            {
              id:9,
              name:"VBS Ebisode 9",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcHPnZyGRSlRRxFUCUxdSrI9TATR8N4tW6w&usqp=CAU",
              video:"https://imdb-video.media-imdb.com/vi1453569561/1434659607842-pgv4ql-1473329537410.mp4?Expires=1635146261&Signature=KERDrQ-W7jhbBE7Pnj75yfSsSItAf1ygY-i2aRS7ZkkSfhoqdBwLgvkbP4gV-Ffb3LPqU4WIPJf9mO3-ZceCFX3DU4aUxSoaosrDoM3YoOQvchO-WCJ6PTfyqceyezM2FyUMsYw2eUdBa7iedlDF30l1hmU0dGQ52xhpOd1gP1suWRp2dKvmV~40f~jvlLiiwZezizCkMQY2vob11s9pQDtDL7AWgETZNdUrscRzS7~LmIBl0KHnPoKJCbV69z~aKKUEeCxK5nh1b5QxqPNbpDTPzTFlnczJzDHYFIoEqjYdn41cNcCFk4bshkJ8tcNQNA-YMoOxmsrhkMQipiRMUg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
         
            },
            
            {
              id:10,
              name:"VBS Ebisode 10",
              image:"https://i.pinimg.com/736x/63/ac/5c/63ac5c248b4d021d478e72ff445f97e8--jesus-saves-christian-quotes.jpg",
              video:'https://imdb-video.media-imdb.com/vi32814873/1434659607842-pgv4ql-1563534023185.mp4?Expires=1635146303&Signature=YFIMKYZxQ1X-CC28yA6k1gMb-UYAf2Bys9tb656z~3C4h~1Lu4kw-d0vBxT4A6sy5YCbc2t-KmWann-KfhWa-27C19qev66eYi6a8QxY-9lJIRGSN8XqVvBi0Y50QN0nKC0q2cgmszQB7WSKIWJntINMB6nvVoKp1tYdE6QwIDN0VTbb3wmgs~nH8t17MYE356UZ-y4IK593Nsza6GmB1MRAyZimIiweguypa0O12ThhDFwVYhpDyTHTWbQk54bFZSjifztjxXK7XFMM9y0UtRoQIc~5~35Js8FzMxXG7~LAHgjt-Z1Pu9naFHl~Cliq8OAk5QlD5Am8IaCzED6oCw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            }
            ,
            {
              id:11,
              name:"VBS Ebisode 11",
              image:"https://i.pinimg.com/474x/b4/f3/01/b4f301fcd57dfdb23047b6b6baacc844.jpg",
              video:'https://imdb-video.media-imdb.com/vi565884441/1434659607842-pgv4ql-1564025924066.mp4?Expires=1635146357&Signature=PXJZL7f1az79-WbS8YXipnjEq8sMs-gYi4LGnlV-cY4s8SVtRwb3DldLBJ9WogO2ADYM6lwnGNRfL78knSN20YZYkXkh7kqQc~9nYepFxPrKle4K26Jp2ZrRFsr8q9UPTOFlZwf9LYNrBrM0~Ne0hdZr5fyq1LxyfO4AX-QHpLU7xmvqum6tpk4Qjg7-D~K~t0Jrfv1ZZ28lhSoNRXbe0d~wJIXiLDHcVBCKBNEejJQ8JGHVcE2gJ5JoPQHm8IWMzENswzn4BjQf~t8xO1b4xDGc2IUV2sYe-L-ya3EBpfGNJzvYGPR3MesT5y8MHazPtphODSdk6s-EiEx9u653mA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            }
            ,
            {
              id:12,
              name:"VBS Ebisode 12",
              image:"https://dogtrainingobedienceschool.com/pic/2257231_full-sunday-morning-quotes-from-the-bible-55-good-morning-bible-quotes-images-wallpaper.jpg",
              video:'https://imdb-video.media-imdb.com/vi1537455641/1434659607842-pgv4ql-1473327751362.mp4?Expires=1635146387&Signature=vJn~1aZvnuF1~foGiHZTPRtNUUaSzqIqvEJaxtbUB9jXBQQFyhDRLPbn1szqFSHFnA9sRuemjHVYeeWFCew8qeV0FWcP~BGmV41cuxYJePaApkdv4-9iuCPwf7~MJl0sd3bIFn9TlxRqn7GHdprsr2OXO9ld8rZz7t~P41pbT7O0r3LlfLbgQ-sLr8AJTUj0ZkJuBPOl3vLiw7XDKLtDZsAu-2vX~TwgHSPrAvhLekADgTKtY7xBfSxFofJ0ENFOJnKAmI8eUOXN3Sz0eCii-OfOkeUq51dcDDOPyMX0NoWc5-qreZR2yIRme~euO8IbYjSjPNe654QL0O6XlacMJA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
             
            }
            ,
            {
              id:13,
              name:"VBS Ebisode 13",
              image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0OQBCQcy0qk8xhMR091ghTuTPpSAwxIaP-A&usqp=CAU",
              video:"https://imdb-video.media-imdb.com/vi1470346777/1434659607842-pgv4ql-1473329537407.mp4?Expires=1635146436&Signature=uRKOiIVSsSuQZ9nV23puzY~t3n-hatske6~8-1J4vIm7ExsDZFenZ9jmjAozz4iWn25q9wBc18PaSSD0DbhhBJ4Awq6rAs-BJD0OvIbPpSI9PFMW268422CJiqDNejnZjWlzwyopx5KlpjEsmT1LwUhtPmHN4sSvXTqqzRROPjYntYxWuvYtI2mkCkVpPXeGheYGJmVDPhFhdJFOEbOCEcbbQSdfsg9ZPHJDvWNL09PgNipMvDXJO-mfXc2TkoRwYcroTZxoSfYKBcEQ3NW6wWKvEguX2SSUgly4h~xBo0cSwAWXV8g~Rjb0da6Mp~t5-aFuhYHBqescCxed7WTITA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
         
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

        const OnchangeVideoController=(item)=>{
          this.setState({
            title:item.name,
            videoUrl: item.video,
            
           
           
          });
          console.log(this.state.title)
        }

        
       const BackNavigation=()=>{
        this.props.navigation.goBack(null)

      }
        

      
   
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
             data={DATA}
           
            
             renderItem={({item}) => (

                <TouchableOpacity activeOpacity={0.8} onPress={ () =>OnchangeVideoController(item)}>
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
     height:width/1.8,
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