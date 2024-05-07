import { useState, useEffect } from 'react'
import {
	useLazyGetUserReposQuery,
	useSearchUsersQuery,
} from '../store/github/github.api'
import { useDebounce } from '../hooks/debounce'
import RepoCard from '../components/RepoCard'

export default function HomePage() {
	const [search, setSearch] = useState('')
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const debounced = useDebounce(search)
	const {
		isLoading,
		isError,
		data: users,
	} = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true,
	})

	const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
		useLazyGetUserReposQuery()

	useEffect(() => {
		setDropdownVisible(debounced.length > 3 && users?.length! > 0)
	}, [debounced, users])

	const userHandler = (username: string) => {
		fetchRepos(username)
		setDropdownVisible(false)
	}

	return (
		<div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
			{isError && (
				<p className='text-center text-red-600'>Something went wrong...</p>
			)}

			<div className='relative w-[560px]'>
				<input
					type='text'
					className='border py-2 px-4 w-full h-[42px] mb-2'
					placeholder='Search for GitHub username...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
					{isLoading && <p>Loading...</p>}
					{dropdownVisible &&
						users?.map((user) => (
							<li
								key={user.id}
								onClick={() => userHandler(user.login)}
								className='py-2 px-4 cursor-pointer hover:bg-gray-500 hover:text-white transition'
							>
								{user.login}
							</li>
						))}
				</ul>

				<div className='container'>
					{areReposLoading && <p>Repositories are loading...</p>}
					{repos?.map((repo) => (
						<RepoCard key={repo.id} repo={repo} />
					))}
				</div>
			</div>
		</div>
	)
}
