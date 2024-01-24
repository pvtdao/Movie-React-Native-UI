import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-snap-carousel'
import TrendingMovieCard from './TrendingMovieCard'
import { fontStyle } from '../utils/styles'
import { useNavigation } from '@react-navigation/native'
import { fetchTrendingMovie } from '../api/movieDb'
import Loading from './Loading'

const Trending = ({ trendingData }) => {
	const { width, height } = useWindowDimensions()
	const navigation = useNavigation()

	const handleNavigate = (item) => {
		navigation.navigate('Movie', item)
	}

	return (
		<View>
			<View className='flex-row justify-between items-center'>
				<Text
					className='text-white text-xl mx-4 my-5'
					style={{ fontFamily: fontStyle['Raleway-bold'] }}
				>
					Trending
				</Text>
			</View>

			<Carousel
				data={trendingData}
				renderItem={(item) => {
					return <TrendingMovieCard onNavigate={handleNavigate} item={item} />
				}}
				sliderWidth={width}
				itemWidth={width * 0.62}
				firstItem={0}
				inactiveSlideOpacity={0.3}
				slideStyle={{
					display: 'flex',
					alignItems: 'center'
				}}
			/>
		</View>
	)
}

export default Trending
