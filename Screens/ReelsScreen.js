import React from 'react';
import {FlatList,View,Text,Button,SafeAreaView,StyleSheet,StatusBar} from "react-native";
import ReelsContainer from '../Components/Reals/ReelsContainer';
const ReelsScreen = ({route,navigation}) => {

    const DATA = [
        {
          id: 1,
          name:'Johnny Philip',
          description:'mussoorie hill driving',
          title: 'First Item',
          video:'https://player.vimeo.com/external/435882538.sd.mp4?s=02d860843242a89b819cde85b2849aeb38065e09&profile_id=165&oauth2_token_id=57447761',
          isLike:true,
          likesCount:30
        },
        {
          id: 2,
          name:'Johnny Philip',
          description:'hello',
          title: 'Second Item',
          video:'https://imdb-video.media-imdb.com/vi2978790169/1434659607842-pgv4ql-1528927513324.mp4?Expires=1635145323&Signature=YtjLvksLANOrh4G-DYnSdjgNNNQg47W6ebAPuWmrMfLLZl9EGEDrAaBLWI-pvPLSz6LLMeuuDe5FSJ0FpYW~KgUpw9A~ZHnZ6-Hs5XJjOHLjGaS9vNFTg63aHedJ1LNz-k2OmLkRS1OfE4kZaOamjPruynoiBhMRMVPRnW7mPMRd9s6uNfjBgeFoyZVcxn-bRd2Wg~qrXrn8ZQsXvzx04rsj8KZGNzjzZ-uHfKwAoh2UnW09C0JNTbz-LU3KR2p19ScoOkQ9fZOVTTYcf4U2Y8ej2190Lw-OhM89TPsugQ~AtXL2m4xwpwD6OlTecRMfs~6SVlT7mK99nT2Qly5j7Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          isLike:false,
          likesCount:15
        },
        {
          id: 3,
          name:'Johnny Philip',
          description:'hello',
          title: 'Third Item',
          video:'https://player.vimeo.com/external/402571180.sd.mp4?s=ce6aef8e9259c29cde79e3db0caf87c0ac213d86&profile_id=165&oauth2_token_id=57447761',
          isLike:true,
          likesCount:5
        },
        {
          id: 4,
          name:'Johnny Lorance',
          description:'hello',
          title: 'Second Item',
          video:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          isLike:false,
          likesCount:16
        },
        {
          id: 5,
          name:'Johnny Philip',
          description:'hello',
          title: 'Second Item',
          video:'https://player.vimeo.com/external/380034326.sd.mp4?s=223f0ee5958adf52267cd09ab6aed399f0950c39&profile_id=165&oauth2_token_id=57447761',
          isLike:false,
          likesCount:15
        },
     
        {
          id: 6,
          name:'Johnny Philip',
          description:'hello',
          title: 'Second Item',
          video:'https://player.vimeo.com/external/599123532.sd.mp4?s=3d817bf8b218e29ebebb80dd6adaf060c3d14c95&profile_id=165&oauth2_token_id=57447761',
          isLike:false,
          likesCount:15
        },
      ];

      const[viewableId,setViewableId]=React.useState(0);
      const onViewableItem=(val)=>{

        
         
      }
    
      const onViewRef = React.useRef((viewableItems)=> {
       // console.log(viewableItems)
        setViewableId(viewableItems.viewableItems[0].key)
        // Use viewable items in state or as intended
      
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    return (
        <View style={styles.container}>
             <StatusBar backgroundColor="#ff000000" barStyle="light-content"/>
        <FlatList
        
          onEndReached={(val)=>{console.log("end")}}
          onViewableItemsChanged={onViewRef.current}
       //  onViewableItemsChanged={(val)=>{onViewableItem(val)}}
          data={DATA}
          renderItem={({item,index})=><ReelsContainer index={index} active_id={viewableId}  item={item}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
         
          pagingEnabled

        />
      </View>
    );
}

export default ReelsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})