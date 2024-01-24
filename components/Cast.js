import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fontStyle } from '../utils/styles'
import { fallbackPersonImage, getImage185 } from '../api/movieDb'

const Cast = ({ cast, navigation }) => {
	console.log('🚀 ~ Cast ~ cast:', cast)
	return (
		<View className='my-6'>
			<Text
				className='text-white text-lg mx-4 mb-5'
				style={{ fontFamily: fontStyle['Raleway-bold'] }}
			>
				Cast
			</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{cast &&
					cast.map((actor, index) => {
						return (
							<TouchableOpacity
								className='mr-4 items-center'
								key={index}
								onPress={() => navigation.navigate('Person', actor)}
							>
								<View className='rounded-full overflow-hidden h-20 w-20 items-center border border-neutral-500'>
									<Image
										className='rounded-2xl  h-24 w-20'
										source={{
											uri:
												getImage185(actor?.profile_path) || fallbackPersonImage
										}}
									/>
								</View>

								<Text className='text-white text-xs mt-1'>
									{actor?.character.length > 10
										? actor?.character.slice(0, 10) + '...'
										: actor?.character}
								</Text>
								<Text className='text-white text-xs mt-1'>
									{actor?.name.length > 10
										? actor?.name.slice(0, 10) + '...'
										: actor?.name}
								</Text>
							</TouchableOpacity>
						)
					})}
			</ScrollView>
		</View>
	)
}

export default Cast
