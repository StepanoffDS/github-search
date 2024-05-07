import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import Navigation from './components/Navigation'

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path='/github-search/' element={<HomePage />} />
				<Route path='/github-search/favorites' element={<FavoritesPage />} />
			</Routes>
		</>
	)
}

export default App
