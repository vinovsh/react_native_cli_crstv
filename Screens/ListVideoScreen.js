import React from 'react';
import {View,Text,Button,FlatList, StyleSheet} from "react-native"
import CardWithTitle from '../Components/Cards/CardWithTitle';



const ListVideoScreen = ({route,navigation}) => {

    React.useEffect(() => {
        navigation.setOptions({ title:route.params.title });
      
      }, []);

      const DATA = [
        {
          id: 1,
          name:"VBS Ebisode 1",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4kRAk8V_bpmRKZu-_QAeSKXwPW0jm0AJdg&usqp=CAU",
          video:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
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
    return (
        <View >
            <FlatList

             style={styles.container}
             data={DATA}
             renderItem={({item})=><CardWithTitle title="video" navigate_to="ListVideoPlayerScreen" source={{uri:item.image}} item={item} />}
             keyExtractor={(item) => item.id}
             
             showsVerticalScrollIndicator={true}
             numColumns={2}
            />



          
        </View>
    );
}

export default ListVideoScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})