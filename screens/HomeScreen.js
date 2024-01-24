import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import {
	Bars3CenterLeftIcon,
	MagnifyingGlassIcon
} from 'react-native-heroicons/outline'
import MovieList from '../components/MovieList'
import Trending from '../components/Trending'
import Loading from '../components/Loading'
import { fontStyle, styles } from '../utils/styles'
import { useNavigation } from '@react-navigation/native'
import {
	fetchTopRatedMovie,
	fetchTrendingMovie,
	fetchUpcomingMovie
} from '../api/movieDb'

const HomeScreen = () => {
	const [upcomingData, setUpcomingData] = useState([])
	const [topRatedData, setTopRatedData] = useState([])
	const [trendingData, setTrendingData] = useState([])
	const [loading, setIsLoading] = useState(true)

	const navigation = useNavigation()

	const getTrendingMovies = async () => {
		const data = await fetchTrendingMovie()

		if (data && data.results) setTrendingData(data.results)
	}

	const getUpcomingMovies = async () => {
		const data = await fetchUpcomingMovie()

		if (data && data.results) setUpcomingData(data.results)
	}

	const getTopRatedMovie = async () => {
		const data = await fetchTopRatedMovie()

		if (data && data.results) setTopRatedData(data.results)
	}

	useEffect(() => {
		getTrendingMovies()
		getUpcomingMovies()
		getTopRatedMovie()
		setIsLoading(false)
	}, [])

	return (
		<View className='flex-1 bg-neutral-800'>
			<SafeAreaView>
				<View className='flex-row justify-between items-center mx-4 pb-3'>
					<Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' />
					<Text
						className='text-white text-3xl font-bold'
						style={{ fontFamily: fontStyle['Raleway-bold'] }}
					>
						<Text style={styles.text}>MOT</Text>PHIM
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('Search')}>
						<MagnifyingGlassIcon size={30} strokeWidth={2} color={'#fff'} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{loading ? (
				<Loading />
			) : (
				<ScrollView
					className='border-yellow-500'
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 10, background: '#fff' }}
				>
					{/* Trending movies carousel */}
					{trendingData.length > 0 && <Trending trendingData={trendingData} />}

					{/* Upcoming movies */}
					{upcomingData.length > 0 && (
						<MovieList title='Upcoming' data={upcomingData} />
					)}

					{/* Top rated movies */}
					{topRatedData.length > 0 && (
						<MovieList title='Top Rated' data={topRatedData} />
					)}
				</ScrollView>
			)}
		</View>
	)
}

export default HomeScreen
