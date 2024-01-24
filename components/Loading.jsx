import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../utils/styles';

const Loading = () => {
    const { width, height } = useWindowDimensions()
    return (
        <View style={{ height, width }} className="absolute flex-row justify-center items-center">
            <Progress.CircleSnail size={160} thickness={12} color={theme.background} />
        </View>
    )
}

export default Loading