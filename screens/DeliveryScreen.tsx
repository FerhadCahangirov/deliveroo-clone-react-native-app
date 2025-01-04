import { View, Image, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RestaurantState, selectRestaurant } from '@/features/restaurantSlice'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import * as Progress from "react-native-progress"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant: {
        id?: number;
        imgUrl?: string;
        title?: string;
        rating?: number;
        genre?: string;
        address?: string;
        short_desc?: string;
        dishes?: any[];
        long?: number;
        lat?: number;
    } = useSelector(selectRestaurant);

    return (
        <View className='bg-[#00ccbb] flex-1'>
            <SafeAreaView className='z-50'>
                <View className='flex-row justify-between items-center p-5'>
                    <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
                        <XMarkIcon color="white" size={30} />
                    </TouchableOpacity>
                    <Text className='font-light text-white text-lg'>
                        Order Help
                    </Text>
                </View>
                <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
                    <View className='flex-row justify-between items-center p-1'>
                        <View className=''>
                            <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                            <Text className='text-4xl font-bold'>44-55 Minutes</Text>
                        </View>
                        <Image
                            source={{ uri: "https://links.papareact.com/fls" }}
                            className='h-20 w-20'
                        />
                    </View>

                    <Progress.Bar color='#00ccbb' indeterminate={true} />

                    <Text className='mt-3 text-gray-500'>
                        Your order at {restaurant.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    longitude: restaurant.long!,
                    latitude: restaurant.lat!,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                mapType={Platform.OS == "android" ? "none" : "standard"}
                style={{ flex: 1, marginTop: -100, zIndex: 0 }}
            >
                <Marker coordinate={{
                    longitude: restaurant.long!,
                    latitude: restaurant.lat!,
                }}
                    title={restaurant.title}
                    description={restaurant.short_desc}
                    identifier='origin'
                    pinColor='#00CCBB'
                />
            </MapView>

            <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28 gap-x-8'>
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru"
                    }}
                    className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
                />

                <View className='flex-1'>
                    <Text className='text-lg'>
                        Edard Stark
                    </Text>
                    <Text className='text-gray-400'>Your Rider</Text>
                </View>

                <Text className='text-[#00CCBB] text-lg mr-5 font-bold'>Call</Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen