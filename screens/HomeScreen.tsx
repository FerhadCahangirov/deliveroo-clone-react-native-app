import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from "react-native-heroicons/outline"
import Categories from '@/components/Categories'
import FeaturedRow from '@/components/FeaturedRow'
import client from '@/sanity'


const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`
            * [_type == "featured"]{
                ...,
                restaurants[] -> {
                    ...,
                    dishes[] ->
                }
            }`).then(data => setFeaturedCategories(data));
    }, [navigation]);

    return (
        <SafeAreaView className='bg-white pt-5'>
            {/* HEADER */}
            <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                <Image source={{
                    uri: "https://links.papareact.com/wru"
                }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full' />

                <View className='flex-1 ml-2'>
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                    <View className='flex-row items-center w-64'>
                        <Text className='font-bold text-lg'>
                            Current Location
                        </Text>
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </View>

                </View>

                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 py-1 px-2 items-center'>
                    <MagnifyingGlassIcon color="#00CCBB" size={20} />
                    <TextInput
                        placeholder='Search...'
                        keyboardType='default'
                        className='px-4'
                    />
                </View>

                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>

            {/* BODY */}
            <ScrollView className='bg-gray-50'
                contentContainerStyle={{
                    paddingBottom: 100
                }}>
                {/* Categories */}
                <Categories />

                {
                    featuredCategories?.map(category => (
                        <FeaturedRow
                            id={category._id}
                            key={category._id}
                            title={category.name}
                            description={category.short_description}
                        />
                    ))
                }


            </ScrollView>

        </SafeAreaView>
    )

}

export default HomeScreen