import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "@/screens/HomeScreen";
import "../global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import RestaurantScreen from "@/screens/RestaurantScreen";

const NavigationStack = createNativeStackNavigator();

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <NavigationStack.Navigator>
                <NavigationStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                <NavigationStack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }}/>
            </NavigationStack.Navigator>
        </SafeAreaProvider>
    )
}
