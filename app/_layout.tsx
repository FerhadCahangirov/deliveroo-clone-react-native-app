import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "@/screens/HomeScreen";
import "../global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import RestaurantScreen from "@/screens/RestaurantScreen";
import { store } from '../store'
import { Provider } from 'react-redux'
import BasketScreen from "@/screens/BasketScreen";
import { TransitionPresets } from "@react-navigation/bottom-tabs";
import PreparingOrderScreen from "@/screens/PreparingOrderScreen";
import DeliveryScreen from "@/screens/DeliveryScreen";

const NavigationStack = createNativeStackNavigator();

export default function RootLayout() {
    return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <NavigationStack.Navigator>
                        <NavigationStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <NavigationStack.Screen name="Restaurant" component={RestaurantScreen} options={{ headerShown: false }} />
                        <NavigationStack.Screen name="Basket" component={BasketScreen} options={({ route, navigation }) => (
                            {
                                presentation: 'modal',
                                headerShown: false,
                                gestureEnabled: true,
                                cardOverlayEnabled: true,
                                ...TransitionPresets.FadeTransition
                            })} />
                        <NavigationStack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{ headerShown: false, presentation: "fullScreenModal" }} />
                        <NavigationStack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false, presentation: "fullScreenModal" }} />
                    </NavigationStack.Navigator>
                </SafeAreaProvider>
            </Provider>
    )
}
