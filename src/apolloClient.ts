import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'https://api.stratz.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
});

export default client;
