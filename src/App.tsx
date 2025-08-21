import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAuth } from '@workos-inc/authkit-react';

export default function App() {
	const { user, signIn, signOut } = useAuth();

	return (
		<div className="p-4"> <div className="flex justify-between items-center mb-4">
			<h1>Convex + AuthKit</h1>
			<button onClick={() => (user ? signOut() : void signIn())}>{user ? 'Sign out' : 'Sign in'}</button>
		</div>
			<Authenticated>
				<Content />
			</Authenticated>
			<Unauthenticated>
				<p>Please sign in to view data</p>
			</Unauthenticated>
		</div>
	);
}

function Content() {
	const data = useQuery(api.myFunctions.listNumbers, { count: 10 });

	if (!data) return <p>Loading...</p>;

	return (
		<div>
			<p>Welcome {data.viewer}!</p>
			<p>Numbers: {data.numbers?.join(', ') || 'None'}</p>
		</div>
	);
}