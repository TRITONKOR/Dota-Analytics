import { useQuery, gql } from '@apollo/client';

const GET_ALL_ITEMS = gql`
query GetAllItems {
    constants {
        items {
            id
            name
            image
        }
    }
}
`;

export const useItems = () => {
    const { data, error, loading } = useQuery(GET_ALL_ITEMS);

    if (loading) return { items: [], loading: true, error: null };
    if (error) {
        console.error("Error fetching items:", error);
        return { items: [], loading: false, error };
    }

    return {
        items: data?.constants.items || [],
        loading: false,
        error: null,
    };
};
