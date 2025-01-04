import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '@/sanity';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import { ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRows from '@/components/DishRows';
import BasketIcon from '@/components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '@/features/restaurantSlice';

const RestaurantScreen = () => {

    const dispatch = useDispatch();

    const { params: {
        id,
        imgUrl,
        title,
        rating,
        address,
        genre,
        short_desc,
        dishes,
        long,
        lat
    } } = useRoute<any>();

    const navigation = useNavigation();

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            address,
            genre,
            short_desc,
            dishes,
            long,
            lat
        }));
    }, []);

    return (
        <>
            <BasketIcon />
            <ScrollView >
                <View className='relative'>
                    <Image source={{
                        uri: urlFor(imgUrl).url()
                    }}
                        className='w-full h-56 bg-gray-300 p-4' />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className='bg-white'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold'>{title}</Text>
                        <View className='flex-row space-x-2 my-1 gap-2'>
                            <View className='flex-row items-center space-x-1 gap-1'>
                                <StarIcon color="green" opacity={.5} size={22} />
                                <Text className='text-gray-500 text-xs'>
                                    <Text className='text-green-500'>{rating}</Text> · {genre}
                                </Text>
                            </View>
                            <View className='flex-row items-center space-x-1 gap-1'>
                                <MapPinIcon color="gray" opacity={.5} size={22} />
                                <Text className='text-gray-500 text-xs'>
                                    Nearby · {address}
                                </Text>
                            </View>
                        </View>
                        <Text className='text-gray-500 mt-2 pb-4'>
                            {short_desc}
                        </Text>
                    </View>

                    <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                        <QuestionMarkCircleIcon color="gray" opacity={.6} size={20} />
                        <Text className='pl-2 flex-1 text-md font-bold'>
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className='pb-40'>
                    <Text className='px-4 pt-6 mb-3 font-bold text-xl'>
                        Menu
                    </Text>

                    {/* Dishrows */}
                    {dishes?.length > 0 ? dishes?.map((dish: any) => (
                        <DishRows
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            desc={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    )) : <Text className='px-4 mb-3 font-bold text-gray-400 text-sm'>We have no items yet!</Text>}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen