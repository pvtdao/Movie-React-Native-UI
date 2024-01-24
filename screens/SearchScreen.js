import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Image,
	useWindowDimensions
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { fontStyle } from '../utils/styles'
import { XMarkIcon } from 'react-native-heroicons/outline'
import Loading from '../components/Loading'
import useDebounce from '../hooks/useDebounce'
import { fallbackMoviePoster, getImage185, searchMovies } from '../api/movieDb'

const SearchScreen = ({ navigation }) => {
	const [results, setResults] = useState([])
	const { width, height } = useWindowDimensions()
	const [loading, setIsLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	console.log('🚀 ~ SearchScreen ~ searchTerm:', searchTerm)

	const debouncedValue = useDebounce(searchTerm, 1000)

	useEffect(() => {
		if (debouncedValue && debouncedValue.length > 2) {
			setIsLoading(true)
			handleSearch(debouncedValue)
			setIsLoading(false)
		} else {
			setIsLoading(false)
			setResults([])
		}
	}, [debouncedValue])

	const handleSearch = useCallback(async (query) => {
		const data = await searchMovies({
			include_adult: 'false',
			language: 'en-US',
			page: '1',
			query
		})
		console.log('🚀 ~ handleSearch ~ data:', data)

		if (data && data.results) setResults(data.results)
	}, [])

	return (
		<SafeAreaView className='bg-neutral-800 flex-1'>
			<View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
				<TextInput
					onChangeText={(value) => setSearchTerm(value)}
					placeholder='Search movies'
					placeholderTextColor={'lightgray'}
					className='pb-1 pl-6 flex-1 text-base text-white tracking-wider'
					style={{
						fontFamily: fontStyle['Raleway-semibold']
					}}
				/>
				<TouchableOpacity
					onPress={() => navigation.navigate('Home')}
					className='rounded-full p-3 m-1 bg-neutral-500'
				>
					<XMarkIcon size={25} color='white' />
				</TouchableOpacity>
			</View>
			{/* Result */}
			{loading ? (
				<Loading />
			) : results.length > 0 ? (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 15 }}
					className='space-y-3'
				>
					<Text
						style={{
							fontFamily: fontStyle['Raleway-bold']
						}}
						className='text-white ml-1'
					>
						Results: ({results.length})
					</Text>
					<View className='flex-row justify-between flex-wrap'>
						{results.map((i, idx) => {
							const movieName = i?.title || ''
							return (
								<TouchableWithoutFeedback
									key={idx}
									onPress={() => navigation.push('Movie', i)}
								>
									<View className='space-y-2 mb-4'>
										<Image
											className='rounded-3xl'
											source={{
												uri: getImage185(i?.poster_path) || fallbackMoviePoster
											}}
											style={{
												width: width * 0.44,
												height: height * 0.3
											}}
										/>
										<Text className='text-neutral-300 ml-1'>
											{movieName.length > 22
												? movieName.slice(0, 22) + '...'
												: movieName}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							)
						})}
					</View>
				</ScrollView>
			) : (
				<View className='flex-row justify-center'>
					<Image
						className='h-96 w-96'
						source={require('../assets/images/movieTime.png')}
						// style={{
						// 	width: width * 0.44,
						// 	height: height * 0.3
						// }}
					/>
				</View>
			)}
		</SafeAreaView>
	)
}

export default SearchScreen
