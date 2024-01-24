import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
	useWindowDimensions,
	Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { fontStyle, styles, theme } from '../utils/styles'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import {
	fallbackMoviePoster,
	fetchMovieCredits,
	fetchMovieDetail,
	fetchMovieSimilar,
	getImage500
} from '../api/movieDb'
import Loading from '../components/Loading'

const iOS = Platform.OS === 'ios'

const MovieScreen = () => {
	const { params: item } = useRoute()
	const movieId = item.id
	const navigation = useNavigation()
	const { width, height } = useWindowDimensions()

	const [isLike, toggleLike] = useState(false)
	const [cast, setCast] = useState([])
	const [similarMovies, setSimilarMovies] = useState([])

	const [loading, setLoading] = useState(false)
	const [movie, setMovie] = useState(item)

	useEffect(() => {
		setLoading(true)
		getMovieDetail(movieId)
		getMovieSimilar(movieId)
		getMovieCredits(movieId)
		setLoading(false)
	}, [item])

	const getMovieDetail = async (id) => {
		const data = await fetchMovieDetail(id)

		if (data) setMovie(data)
	}

	const getMovieSimilar = async (id) => {
		const data = await fetchMovieSimilar(id)

		if (data && data.results) setSimilarMovies(data.results)
	}

	const getMovieCredits = async (id) => {
		const data = await fetchMovieCredits(id)

		if (data && data.cast) setCast(data.cast)
	}

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 20 }}
			className='flex-1 bg-neutral-900'
		>
			{/* Back button and movie poster */}
			<View className='w-full'>
				<SafeAreaView className='absolute z-20 w-full'>
					{loading ? (
						<Loading />
					) : (
						<View
							className={`flex-row justify-between items-center px-4 ${
								iOS ? '' : 'mt-3'
							}`}
						>
							<TouchableOpacity
								onPress={() => navigation.goBack()}
								style={styles.background}
								className='rounded-xl p-1'
							>
								<ChevronLeftIcon size={28} strokeWidth={2.5} color={'#fff'} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => toggleLike(!isLike)}>
								<HeartIcon
									size={35}
									strokeWidth={1}
									color={isLike ? theme.background : '#fff'}
								/>
							</TouchableOpacity>
						</View>
					)}
				</SafeAreaView>
				<View>
					<Image
						// source={require('../assets/images/moviePoster2.png')}
						source={{
							uri: getImage500(movie?.poster_path) || fallbackMoviePoster
						}}
						style={{
							width: width,
							height: height * 0.6
						}}
					/>
					<LinearGradient
						className='absolute bottom-0'
						colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
						style={{ width, height: height * 0.4 }}
					></LinearGradient>
				</View>
			</View>

			{/* Movie Detail */}
			<View style={{ marginTop: -height * 0.09 }}>
				<Text
					className='text-white text-center text-3xl tracking-wider'
					style={{
						fontFamily: fontStyle['Raleway-bold']
					}}
				>
					{movie.title}
				</Text>
				<Text
					className='text-neutral-400 text-center text-base mt-2'
					style={{
						fontFamily: fontStyle['Raleway-semibold']
					}}
				>
					{movie?.status} • {movie?.release_date} • {movie?.runtime} min
				</Text>
				{/* Genres */}
				<View className='flex-row justify-center mx-4 space-x-2 mt-2'>
					{movie?.genres?.map((g, idx) => {
						return (
							<Text
								className='text-neutral-400 text-center text-base'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
								key={g.id}
							>
								{g.name} {movie?.genres.length - 1 !== idx && '•'}
							</Text>
						)
					})}
				</View>
				{/* Description */}
				<Text className='text-neutral-400 mx-4 tracking-wider mt-2'>
					{movie?.overview}
				</Text>
			</View>

			{/* Cast */}
			{cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

			{/* Similar movies */}
			{similarMovies.length > 0 && (
				<MovieList title={'Similar Movies'} hideSeeAll data={similarMovies} />
			)}
		</ScrollView>
	)
}

export default MovieScreen
