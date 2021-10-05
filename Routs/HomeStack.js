import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Category from '../Screens/CategoryDetails';


import Colors from '../Components/ColorPalet';
import MenuIcon from '../Components/Header/MenuIcon';
import Logo from '../Components/Header/Logo';
import LivePlayerFull from '../Screens/LivePlayerFull';

const Stack = createNativeStackNavigator();
const HomeStack = ({ navigation }) => {
    
    return (
      <>
        
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
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
         
          
        </Stack.Navigator>
      </>
    );
  };

  export default HomeStack;