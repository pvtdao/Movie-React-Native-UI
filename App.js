import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { StatusBar, View } from 'react-native'
import AppNavigation from './navigation/appNavigation'

SplashScreen.preventAutoHideAsync()

export default function App() {
	const [fontsLoaded] = useFonts({
		Raleway: require('./assets/fonts/static/Raleway-Regular.ttf'),
		'Raleway-semibold': require('./assets/fonts/static/Raleway-SemiBold.ttf'),
		'Raleway-bold': require('./assets/fonts/static/Raleway-Bold.ttf'),
		'Raleway-light': require('./assets/fonts/static/Raleway-Light.ttf'),
		'Raleway-medium': require('./assets/fonts/static/Raleway-Medium.ttf')
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	return (
		<View className='flex-1' onLayout={onLayoutRootView}>
			<StatusBar barStyle={'light-content'} />
			<AppNavigation />
		</View>
	)
}
