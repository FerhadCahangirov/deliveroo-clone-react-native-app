import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery" as never);
        }, 4000);
    }, [])

    return (
        <SafeAreaView className='bg-[#00ccbb] flex-1 justify-center items-center'>
            <Image
                source={require('../assets/images/Payment Done.gif')}
                style={{ width: 384, height: 384 }}
            />

            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className='text-lg my-10 text-white font-extrabold text-center'
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color='white' />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen