import { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

export default function RepoCard({ repo }: { repo: IRepo }) {
	const { addFavorite, removeFavorite } = useActions()
	const { favorites } = useAppSelector((state) => state.github)

	const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

	const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		addFavorite(repo.html_url)
		setIsFav(true)
	}

	const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		removeFavorite(repo.html_url)
		setIsFav(false)
	}

	return (
		<a
			href={repo.html_url}
			target='_blank'
			rel='noreferrer'
			className='block border py-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all'
		>
			<h2 className='text-lg font-bold'>{repo.full_name}</h2>
			<p className='text-sm font-thin'>{repo?.description}</p>
			{!isFav && (
				<button
					className='mt-2 mr-2 py-1 px-2 text-sm bg-yellow-400 rounded hover:shadow-md transition-all'
					onClick={addToFavorite}
				>
					Add
				</button>
			)}
			{isFav && (
				<button
					className='mt-2 py-1 px-2 text-sm bg-red-400 rounded hover:shadow-md transition-all'
					onClick={removeFromFavorite}
				>
					Remove
				</button>
			)}
		</a>
	)
}
