import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client, { urlFor } from '@/sanity'

const FeaturedRow = ({ id, title, description }: {
    id: number,
    title: string,
    description: string
}) => {

    const [restaurants, setRestaurants] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`* [_type == "featured" && _id == $id]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type->{
                title
                }
            }
        }[0]`, { id }).then(data => setRestaurants(data.restaurants));
    }, []);

    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>

            <Text className='text-xs text-gray-500 px-4'>{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {
                    restaurants?.map(data => (
                        <RestaurantCard
                            key={data._id}
                            id={data._id}
                            imgUrl={urlFor(data.image).url()}
                            title={data.name}
                            rating={data.rating}
                            address={data.address}
                            genre={data.type.title}
                            short_desc={data.short_description}
                            dishes={data.dishes}
                            long={data.long}
                            lat={data.Lat}
                        />
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default FeaturedRow