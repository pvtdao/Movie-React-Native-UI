import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
	Image,
	Text,
	TouchableWithoutFeedback,
	useWindowDimensions
} from 'react-native'
import { fallbackMoviePoster, getImage500 } from '../api/movieDb'

const TrendingMovieCard = ({ item: { item }, onNavigate }) => {
	const { width, height } = useWindowDimensions()

	return (
		<TouchableWithoutFeedback onPress={() => onNavigate(item)}>
			<Image
				source={{ uri: getImage500(item.poster_path) || fallbackMoviePoster }}
				style={{
					width: width * 0.6,
					height: height * 0.4
				}}
				className='rounded-3xl'
				resizeMode='cover'
			/>
		</TouchableWithoutFeedback>
	)
}

export default TrendingMovieCard
