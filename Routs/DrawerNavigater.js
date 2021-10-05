import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from '../Components/ColorPalet';
//screens
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

const DrawerNavigater = ({ route, navigation }) => {
    return (
      <>
      
         <Drawer.Navigator >
           <Drawer.Screen 
        
              options={{
                 headerShown: false,
                // headerTitle: () => <Logo />,
                 headerStyle: {
                 backgroundColor:Colors.theamColor,
              },
              headerTitleAlign: 'center',
              // headerLeft: (props) => <Menu  />,
        
              }}
              name="Main"
              component={HomeStack}
     
          /> 
          
       {/*  <Drawer.Screen name="Screen"   component={StackNav} /> */}
       
      </Drawer.Navigator>
      </>
    );
  };

  export default DrawerNavigater;