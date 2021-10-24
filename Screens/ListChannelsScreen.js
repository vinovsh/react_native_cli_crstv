import React from 'react';
import {View,Text,Button,FlatList, StyleSheet} from "react-native"
import ListRectangleCard from '../Components/Cards/ListRectangleCard';



const ListChannelsScreen = ({route,navigation}) => {

    React.useEffect(() => {
      //  navigation.setOptions({ title:route.params.title });
      
      }, []);

      const DATA = [
        {
          id: 1,
          name:"VBS Ebisode 1",
          image:"http://www.tolkienlibrary.com/press/images/movie-tie-in-The-hobbit.jpg",
        },
        {
          id: 2,
          name:"VBS Ebisode 2 with sepcial Event",
          image:"https://i.redd.it/c1kc1uylw8d31.jpg",
         
         
        },
        {
          id:3,
          name:"VBS Ebisode 3",
          image:"https://cdn.bollywoodmdb.com/movies/largethumb/2019/arjun-reddy-remake/arjun-reddy-remake-poster-4.jpg",
          
         
        },
        
        {
          id:4,
          name:"VBS Ebisode 4",
          image:"https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Tenet_movie_poster.jpg/220px-Tenet_movie_poster.jpg",
         
         
        }
        ,
        {
          id:5,
          name:"VBS Ebisode 5",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw1-MVmbfCXCtz-kfl3kFaLMuwpXuP7y5QXw&usqp=CAU",
         
     
        }
        ,
        {
          id:6,
          name:"VBS Ebisode 6",
          image:"https://lumiere-a.akamaihd.net/v1/images/p_junglecruise_21740_v2_bb7f0ae4.jpeg",
         
         
        }
        ,
        {
          id:7,
          name:"VBS Ebisode 7",
          image:"https://cdn.shopify.com/s/files/1/0548/8404/0870/products/TheHaunting-PersonalizedHorrorMoviePoster_1600x.jpg?v=1617275578",
         
         
        }
        ,
        {
          id: 8,
          name:"VBS Ebisode 8 with sepcial Event",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9DGxZUTkxGj8dUSxXplMCzXiB6gF5GxMl2w&usqp=CAU",
         
         
        },
        {
          id:9,
          name:"VBS Ebisode 9",
          image:"https://upload.wikimedia.org/wikipedia/en/6/6f/War_official_poster.jpg",
         
        },
        
        {
          id:10,
          name:"VBS Ebisode 10",
          image:"https://media-cache.cinematerial.com/p/500x/ckcdyxku/the-expatriate-dvd-movie-cover.jpg?v=1456481599",
         
         
        }
        ,
        {
          id:11,
          name:"VBS Ebisode 11",
          image:"https://static.wikia.nocookie.net/filmguide/images/9/93/Avatar_2009_Film_Poster.jpg/revision/latest?cb=20190813093347",
         
         
        }
        ,
        {
          id:12,
          name:"VBS Ebisode 12",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyPU5dduUd-WLP_LsQ_k13vwmTalsvSJAhrQ&usqp=CAU",
         
         
        }
        ,
        {
          id:13,
          name:"VBS Ebisode 13",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIQXIr-9s_5FWvsEhCh0Yj5nG2hzoeDzkXxA&usqp=CAU",
         
     
        }
      ];
    return (
        <View >
            <FlatList

             style={styles.container}
             data={DATA}
             renderItem={({item})=><ListRectangleCard  source={{uri:item.image}} item={item} />}
             keyExtractor={(item) => item.id}
             
             showsVerticalScrollIndicator={true}
             numColumns={2}
            />



          
        </View>
    );
}

export default ListChannelsScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})