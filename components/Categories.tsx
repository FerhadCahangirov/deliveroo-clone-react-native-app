import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '@/sanity';

const Categories = () => {

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`* [_type == "category"]`)
            .then(data => setCategories(data));
    }, []);

    return (
        <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
        >
            {/* Category Card */}
            {
                categories?.map(data => (
                    <CategoryCard key={data._id} id={data._id} imgUrl={urlFor(data.image).url()} title={data.title!} />
                ))
            }
        </ScrollView>
    )
}

export default Categories