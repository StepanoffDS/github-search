import { Link } from 'react-router-dom'

export default function FavoritesPage() {
	return (
		<nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
			<h3 className='font-bold'>GitHub Search</h3>

			<span>
				<Link to='/github-search/' className='mr-2'>
					Home
				</Link>
				<Link to='/github-search/favorites'>Favorites</Link>
			</span>
		</nav>
	)
}
