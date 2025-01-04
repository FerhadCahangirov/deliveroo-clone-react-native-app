import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '@/features/basketSlice';
import { selectRestaurant } from '@/features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '@/sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const dispatch = useDispatch();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    if (items?.length === 0) return null;

    useMemo(() => {
        const groupedItems = items.reduce((results: any, item: any) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
                    <View>
                        <Text className='text-lg font-bold text-center'>Basket</Text>
                        <Text className='text-gray-400 text-center'>
                            {restaurant.title}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className='rounded-full bg-gray-100 absolute top-3 right-3'
                    >
                        <XCircleIcon color="#00ccbb" height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className='flex-row items-center space-x-4 gap-4 px-4 py-3 bg-white my-5'>
                    <Image source={{
                        uri: "https://links.papareact.com/wru"
                    }}
                        className='h-7 w-7 bg-gray-300 p-4 rounded-full' />
                    <Text className='flex-1'>Deliver in 50-70 min</Text>
                    <TouchableOpacity>
                        <Text className='text-[#00ccbb]'>Change</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className='divide-y divide-gray-200'>
                    {
                        Object.entries(groupedItemsInBasket).map(([key, items]: [key: any, items: any]) => (
                            <View key={key} className='flex-row items-center space-x-3 gap-3 bg-white py-2 px-5'>
                                <Text>{items.length} x</Text>
                                <Image source={{
                                    uri: urlFor(items[0].image).url()
                                }}
                                    className='h-12 w-12  rounded-full' />
                                <Text className='flex-1'>{items[0]?.name}</Text>

                                <Text className='text-gray-600'>
                                    $ {items[0]?.price}.00
                                </Text>

                                <TouchableOpacity>
                                    <Text
                                        className='text-[#00ccbb] text-xs'
                                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    >
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                </ScrollView>

                <View className='p-5 bg-white mt-5 space-y-4 gap-y-4'>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>
                            ${basketTotal}.00
                        </Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Delivery Fee</Text>
                        <Text className='text-gray-400'>
                            $5.99
                        </Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <Text>Order total</Text>
                        <Text className='font-extrabold'>
                            $ {(basketTotal + 5.99)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        className='rounded-lg bg-[#00ccbb] p-4'
                        onPress={() => navigation.navigate("PreparingOrder" as never)}
                    >
                        <Text className='text-center text-white text-lg font-extrabold'>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen