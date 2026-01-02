
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator, DrawerNav } from "../navigation/ApplicationNavigation";
import { RootState } from "../root/store";
import { useSelector } from "react-redux";
import { navigationRef } from "./navigationRef";


const MainScreen = () => {
const isAuthenticated = useSelector((state: RootState) => state.userData.isAuthenticated);
  return (
    <NavigationContainer ref={navigationRef}>       
        {isAuthenticated ? <DrawerNav/> : < AuthNavigator/>} 
     
    </NavigationContainer>
  
  );
};

export default MainScreen;


