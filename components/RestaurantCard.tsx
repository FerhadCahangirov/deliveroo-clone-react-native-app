import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
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
}: {
    id: number
    imgUrl: string
    title: string
    rating: number
    address: string
    genre: string
    short_desc: string
    dishes: any[]
    long: number
    lat: number
}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate({
                    name: "Restaurant",
                    params: {
                        id: id!,
                        imgUrl: imgUrl!,
                        title: title!,
                        rating: rating!,
                        address: address!,
                        genre: genre!,
                        short_desc: short_desc!,
                        dishes: dishes!,
                        long: long!,
                        lat: lat!
                    }
                } as never);
            }}
            className='bg-white mr-3 shadow' >
            <Image source={{
                uri: imgUrl
            }} className='w-64 h-36 rounded-sm' />
            <View className='px-3 pb-4'>
                <Text className='font-bold text-lg pt-2'>{title}</Text>
                <View className='flex-row items-center space-x-1 gap-1'>
                    <StarIcon color="green" opacity={.5} size={22} />
                    <Text className='text-gray-500 text-xs'>
                        <Text className='text-green-500'>{rating}</Text> · {genre}
                    </Text>
                </View>
                <View className='flex-row items-center space-x-1'>
                    <MapPinIcon color="gray" opacity={0.4} size={22} />
                    <Text className='text-xs text-gray-500'>Nearyby · {address.length > 15 ? address.substring(0, 15) + "..." : address}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard