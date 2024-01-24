import * as Font from 'expo-font'

export default useFonts = async () =>
	await Font.loadAsync({
		Raleway: require('../assets/fonts/Raleway-VariableFont_wght.ttf')
	})
