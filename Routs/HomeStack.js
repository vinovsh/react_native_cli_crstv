import React from 'react';
import{Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Category from '../Screens/CategoryDetails';


import Colors from '../Components/ColorPalet';
import MenuIcon from '../Components/Header/MenuIcon';
import Logo from '../Components/Header/Logo';
import LivePlayerFull from '../Screens/LivePlayerFull';
import QuizeScreen from '../Screens/QuizeScreen';
import ReelsScreen from '../Screens/ReelsScreen';
import ViewImageScreen from '../Screens/ViewImageScreen';
import StatusVideoScreen from '../Screens/StatusVideoScreen';
import ListVideoScreen from '../Screens/ListVideoScreen';
import ListCategoryScreen from '../Screens/ListCategoryScreen';
import ListVideoPlayerScreen from '../Screens/ListVideoPlayerScreen';
import ListChannelsScreen from '../Screens/ListChannelsScreen';
import ListRecentVideosScreen from '../Screens/ListRecentVideosScreen';
import ListRecentVideoPlayerScreen from '../Screens/ListRecentVideoPlayerScreen';
import AddVideoScreen from '../Screens/AddVideoScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MyVideosScreen from '../Screens/MyVideosScreen';
import EditReelsScreen from '../Screens/EditReelsScreen';
import ReelPlayerScreen from '../Screens/ReelPlayerScreen';
import ReferredPeopleScreen from '../Screens/ReferredPeoplesScreen';

import LeaderBoard from '../Screens/LeaderBoard';

const Stack = createNativeStackNavigator();
const HomeStack = (props) => {
      
    return (
     
        
        <Stack.Navigator >
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={props.route.params}
            options={{

              

              headerTitle: () => <Logo />,

              headerStyle: {
                backgroundColor:Colors.theamColor,
                
              },
            headerTitleAlign: 'center',
            headerLeft: (props) => <MenuIcon  />,


            }}
          />


          <Stack.Screen
             initialParams={props.route.params}
             options={{
               headerShown: false,
             }}
             name="Category" 
              component={Category} 
           />
          <Stack.Screen
              initialParams={props.route.params}
              options={{
                 headerShown: false,
              }}
              name="Live" 
              component={LivePlayerFull}
            />

           <Stack.Screen
              initialParams={props.route.params}
              options={{
                  headerShown: false,
              }}
              name="QuizeScreen" 
              component={QuizeScreen}
           />

            <Stack.Screen
              initialParams={props.route.params}
              options={{
                headerShown: false,
              }}
              name="Reels" 
              component={ReelsScreen}
            />


             <Stack.Screen
                initialParams={props.route.params}
                options={{
                   headerShown: true,
                 
                  title:"Photo"
                }}
                
               name="ViewImage" 
               component={ViewImageScreen}
              />

              <Stack.Screen
                 initialParams={props.route.params}
                 options={{
                   headerShown: true,
 
                    title:"Status"
                 }}

                 name="whatsapp_status"
                 component={StatusVideoScreen}
               />

               <Stack.Screen
                  initialParams={props.route.params}
                   options={{
                      headerShown: true,

                      title:"Videos"
                   }}

                  name="ListVideoScreen"
                  component={ListVideoScreen}
               />

               
                <Stack.Screen
                  initialParams={props.route.params}
                  options={{
                     headerShown: true,

                       title:"Recent Videos"
                     }}

                  name="ListRecentVideoScreen"
                  component={ListRecentVideosScreen}
                />

                 <Stack.Screen
                    initialParams={props.route.params}
                    options={{
                       headerShown: true,

                       title:"Our Shows"
                    }}

                  name="ListCategoryScreen"
                  component={ListCategoryScreen}
               />
                <Stack.Screen
                  initialParams={props.route.params}
                  options={{
                     headerShown: false,

                      title:"player"
                  }}

                     name="ListVideoPlayerScreen"
                     component={ListVideoPlayerScreen}
                />

                 <Stack.Screen
                  initialParams={props.route.params}
                  options={{
                     headerShown: false,

                      title:"player"
                  }}

                     name="ListRecentVideoPlayerScreen"
                     component={ListRecentVideoPlayerScreen}
                />

                <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: true,

                      title:"Tv Channels"
                  }}

                   name="ListChannelsScreen"
                   component={ListChannelsScreen}
                />

                <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: true,

                      title:"Add Details"
                  }}

                   name="UploadVideo"
                   component={AddVideoScreen}
                />

                <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: true,

                      title:"Profile"
                  }}

                   name="ProfileScreen"
                   component={ProfileScreen}
                />

                <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: true,

                      title:"My Videos"
                  }}

                   name="myVideosScreen"
                   component={MyVideosScreen}
                />

                <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: true,

                      title:"Edit"
                  }}

                   name="editVideosScreen"
                   component={EditReelsScreen}
                />

                 <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: false,

                      title:"player"
                  }}

                   name="ReelPlayerScreen"
                   component={ReelPlayerScreen}
                />

               <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: true,

                      title:"Referrals"
                  }}

                   name="ReferredPeopleScreen"
                   component={ReferredPeopleScreen}
                />

                <Stack.Screen
                  initialParams={props.route.params} 
                  options={{
                      headerShown: false,

                      title:"LeaderBoard"
                  }}

                   name="LeaderBoard"
                   component={LeaderBoard}
                />
         
          
        </Stack.Navigator>
  
    );
  };

  export default HomeStack;