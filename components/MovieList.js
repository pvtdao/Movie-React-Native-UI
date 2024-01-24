import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Image,
	useWindowDimensions
} from 'react-native'
import React, { useState } from 'react'
import { fontStyle, styles } from '../utils/styles'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, getImage185, getImage500 } from '../api/movieDb'

const MovieList = ({ title, data, hideSeeAll = false }) => {
	const navigation = useNavigation()
	const { width, height } = useWindowDimensions()
	return (
		<View className='my-5 space-y-4'>
			<View className='mr-4 flex-row justify-between items-center'>
				<Text
					className='text-white text-xl mx-4 my-5'
					style={{ fontFamily: fontStyle['Raleway-bold'] }}
				>
					{title}
				</Text>
				{!hideSeeAll && (
					<TouchableOpacity>
						<Text
							className='text-lg'
							style={[styles.text, { fontFamily: fontStyle['Raleway-light'] }]}
						>
							See All
						</Text>
					</TouchableOpacity>
				)}
			</View>

			{/* Movie row */}
			<ScrollView
				showsHorizontalScrollIndicator={false}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{data.map((item, index) => {
					const movieName = item?.title
					return (
						<TouchableWithoutFeedback
							key={index}
							onPress={() => navigation.push('Movie', item)}
						>
							<View className='space-y-1 mr-4'>
								<Image
									source={{
										uri: getImage185(item.poster_path) || fallbackMoviePoster
									}}
									className='rounded-3xl'
									style={{ width: width * 0.4, height: height * 0.3 }}
								/>
								<Text
									style={{ fontFamily: fontStyle['Raleway'] }}
									className='text-neutral-300  ml-1 text-center pt-2'
								>
									{movieName?.length > 14
										? movieName.slice(0, 14) + '...'
										: movieName}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					)
				})}
			</ScrollView>
		</View>
	)
}

export default MovieList
