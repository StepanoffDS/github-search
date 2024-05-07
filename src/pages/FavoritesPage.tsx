import { useAppSelector } from '../hooks/redux'

export default function FavoritesPage() {
	const { favorites } = useAppSelector((state) => state.github)

	if (favorites.length === 0) {
		return <h3 className='text-center'>No items in favorites</h3>
	}

	return (
		<div className='flex flex-col items-center pt-10 mx-auto h-screen w-screen'>
			<h1 className='text-xl mb-4'>Favorites Page</h1>
			<ul className='list-none flex flex-col gap-2'>
				{favorites.map((f: string) => (
					<li key={f}>
						<a
							href={f}
							target='_blank'
							rel='noreferrer'
							className='hover:underline'
						>
							{f}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}
