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

          options={{
            headerShown: false,
          }}
           name="Category" 
           component={Category} 
           />
          <Stack.Screen

           options={{
              headerShown: false,
           }}
           name="Live" 
           component={LivePlayerFull}
            />

           <Stack.Screen

              options={{
                  headerShown: false,
              }}
              name="QuizeScreen" 
              component={QuizeScreen}
           />

            <Stack.Screen

              options={{
                headerShown: false,
              }}
              name="Reels" 
              component={ReelsScreen}
            />


             <Stack.Screen

                options={{
                   headerShown: true,
                 
                  title:"Photo"
                }}
                
               name="ViewImage" 
               component={ViewImageScreen}
              />

              <Stack.Screen

                 options={{
                   headerShown: true,
 
                    title:"Status"
                 }}

                 name="whatsapp_status"
                 component={StatusVideoScreen}
               />

               <Stack.Screen

                   options={{
                      headerShown: true,

                      title:"Videos"
                   }}

                  name="ListVideoScreen"
                  component={ListVideoScreen}
               />

                 <Stack.Screen

                  options={{
                    headerShown: true,

                    title:"Our Shows"
                  }}

                  name="ListCategoryScreen"
                  component={ListCategoryScreen}
               />
                <Stack.Screen

                  options={{
                     headerShown: false,

                      title:"player"
                      }}

                     name="ListVideoPlayerScreen"
                     component={ListVideoPlayerScreen}
                />

                <Stack.Screen

                  options={{
                      headerShown: true,

                      title:"Tv Channels"
                    }}

                   name="ListChannelsScreen"
                   component={ListChannelsScreen}
                />
         
          
        </Stack.Navigator>
  
    );
  };

  export default HomeStack;