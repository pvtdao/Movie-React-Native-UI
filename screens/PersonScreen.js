import {
	View,
	Text,
	Platform,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
	useWindowDimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontStyle, styles, theme } from '../utils/styles'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import {
	fallbackPersonImage,
	fetchPersonDetail,
	fetchPersonMovie,
	getImage342,
	getImage500
} from '../api/movieDb'

const iOS = Platform.OS === 'ios'

const PersonScreen = ({ navigation }) => {
	const { params: item } = useRoute()
	const personId = item?.id
	console.log('🚀 ~ PersonScreen ~ item:', item)
	const [isLike, toggleLike] = useState(false)
	const [loading, setLoading] = useState(false)

	const { width, height } = useWindowDimensions()
	const [personMovie, setPersonMovie] = useState([])
	const [person, setPerson] = useState(item)
	console.log('🚀', person)

	useEffect(() => {
		setLoading(true)
		getPersonDetail(personId)
		getPersonMovie(personId)
		setLoading(false)
	}, [])

	const getPersonDetail = async (id) => {
		const data = await fetchPersonDetail(id)

		if (data) setPerson(data)
	}

	const getPersonMovie = async (id) => {
		const data = await fetchPersonMovie(id)

		if (data && data.crew) setPersonMovie(data.crew)
	}

	return (
		<ScrollView
			className='flex-1 bg-neutral-900'
			contentContainerStyle={{ paddingBottom: 20 }}
		>
			<View className='w-full'>
				<SafeAreaView className='z-20 w-full'>
					<View
						className={`flex-row justify-between items-center px-4 ${
							iOS ? '' : 'my-3'
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
				</SafeAreaView>
			</View>

			{/* Person detail */}
			{loading ? (
				<Loading />
			) : (
				<>
					<View
						className='flex-row justify-center'
						style={{
							shadowColor: 'gray',
							shadowRadius: 40,
							shadowOffset: { width: 0, height: 5 },
							shadowOpacity: 1,
							elevation: 50
						}}
					>
						<View className='items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500'>
							<Image
								// source={require('../assets/images/castImage2.png')}
								source={{
									uri: getImage342(person.profile_path) || fallbackPersonImage
								}}
								style={{
									width: width * 0.74,
									height: height * 0.43
								}}
							/>
						</View>
					</View>
					<View className='mt-6'>
						<Text
							className='text-3xl text-white text-center'
							style={{
								fontFamily: fontStyle['Raleway-bold']
							}}
						>
							{person.name}
						</Text>
						<Text
							className='text-base text-neutral-500 text-center'
							style={{
								fontFamily: fontStyle['Raleway-bold']
							}}
						>
							{person?.place_of_birth}
						</Text>
					</View>
					<View className='mx-3 p-4 mt-6 justify-between flex-row items-center bg-neutral-700 rounded-full'>
						<View className='px-2 items-center border-r-2 border-r-neutral-400'>
							<Text
								className='text-white'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								Gender
							</Text>
							<Text
								className='text-neutral-300 text-sm'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								{person?.gender === 1 ? 'Female' : 'Male'}
							</Text>
						</View>
						<View className='px-2 items-center border-r-2 border-r-neutral-400'>
							<Text
								className='text-white'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								Birthday
							</Text>
							<Text
								className='text-neutral-300 text-sm'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								{person.birthday}
							</Text>
						</View>
						<View className='px-2 items-center border-r-2 border-r-neutral-400'>
							<Text
								className='text-white'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								Known for
							</Text>
							<Text
								className='text-neutral-300 text-sm'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								{person.known_for_department}
							</Text>
						</View>
						<View className='px-2 items-center '>
							<Text
								className='text-white'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								Popular
							</Text>
							<Text
								className='text-neutral-300 text-sm'
								style={{
									fontFamily: fontStyle['Raleway-semibold']
								}}
							>
								{person?.popularity?.toFixed(2)}%
							</Text>
						</View>
					</View>
					<View className='my-6 mx-4 space-y-2'>
						<Text className='text-white text-lg'>Biography</Text>
						<Text className='text-neutral-400 tracking-wide'>
							{person.biography || 'N/A'}
						</Text>
					</View>
					{personMovie.length > 0 && (
						<MovieList data={personMovie} title={'Movies'} hideSeeAll />
					)}
				</>
			)}
		</ScrollView>
	)
}

export default PersonScreen
