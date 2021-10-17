import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from '../Components/ColorPalet';
//screens
import HomeStack from './HomeStack';
import MenuSlider from '../Screens/MenuSlider';

const Drawer = createDrawerNavigator();

const DrawerNavigater = ({ route, navigation }) => {
    return (
 
      
         <Drawer.Navigator  initialRouteName="Main" drawerContent={(props) => <MenuSlider {...props} />}>
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
 
    );
  };

  export default DrawerNavigater;