import axios from 'axios'
import { API_KEY } from '../constants'

const baseURL = 'https://api.themoviedb.org/3'
const trendingMovieEndpoint = `${baseURL}/trending/movie/day?api_key=${API_KEY}`
const upcomingMovieEndpoint = `${baseURL}/movie/upcoming?api_key=${API_KEY}`
const topRatedMovieEndpoint = `${baseURL}/movie/top_rated?api_key=${API_KEY}`

const movieDetailEndpoint = (id) => `${baseURL}/movie/${id}?api_key=${API_KEY}`
const movieCreditEndpoint = (id) =>
	`${baseURL}/movie/${id}/credits?api_key=${API_KEY}`
const movieSimilarEndpoint = (id) =>
	`${baseURL}/movie/${id}/similar?api_key=${API_KEY}`

const searchMovieEndpoint = () => `${baseURL}/search/movie?api_key=${API_KEY}`

const personDetailEndpoint = (id) =>
	`${baseURL}/person/${id}?api_key=${API_KEY}`
const personMovieEndpoint = (id) =>
	`${baseURL}/person/${id}/movie_credits?api_key=${API_KEY}`

export const getImage500 = (path) =>
	path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const getImage342 = (path) =>
	path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const getImage185 = (path) =>
	path ? `https://image.tmdb.org/t/p/w185/${path}` : null

export const fallbackMoviePoster =
	'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg'
export const fallbackPersonImage =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU'

const apiCall = async (endpoint, params) => {
	const options = {
		method: 'GET',
		url: endpoint,
		params: params ? params : {}
	}

	try {
		const res = await axios.request(options)

		return res.data
	} catch (error) {
		console.log('[ERROR]: ', error)
	}
}

export const fetchTrendingMovie = () => {
	return apiCall(trendingMovieEndpoint)
}

export const fetchUpcomingMovie = () => {
	return apiCall(upcomingMovieEndpoint)
}
export const fetchTopRatedMovie = () => {
	return apiCall(topRatedMovieEndpoint)
}

export const fetchMovieDetail = (id) => {
	return apiCall(movieDetailEndpoint(id))
}

export const fetchMovieCredits = (id) => {
	return apiCall(movieCreditEndpoint(id))
}
export const fetchMovieSimilar = (id) => {
	return apiCall(movieSimilarEndpoint(id))
}

export const fetchPersonDetail = (id) => {
	return apiCall(personDetailEndpoint(id))
}

export const fetchPersonMovie = (id) => {
	return apiCall(personMovieEndpoint(id))
}

export const searchMovies = (params) => {
	return apiCall(searchMovieEndpoint(), params)
}
