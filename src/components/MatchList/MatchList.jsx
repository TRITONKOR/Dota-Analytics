import { useQuery, gql } from '@apollo/client';
import MatchBar from '../MatchBar/MatchBar.jsx';
import './MatchList.scss';

const GET_PLAYER_MATCHES = gql`
query GetPlayerMatches($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
        steamAccount{
            name
        }
        matches(request: {
        take: 15
        }) {
            id
            startDateTime
            durationSeconds
            gameMode
            players {
                steamAccountId
                steamAccount{
                    name
                }
                isVictory
                position
                level
                kills
                deaths
                assists
                award
                item0Id
                item1Id
                item2Id
                item3Id
                item4Id
                item5Id
                hero {
                    shortName
                }
            }
        }
    }
}
`;

const PlayerMatches = ({ steamAccountId }) => {
    const { loading, error, data } = useQuery(GET_PLAYER_MATCHES, {
        variables: { steamAccountId: Number(steamAccountId) }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='match-list-container'>
            <ul className='match-list'>
                <div className='user-info'>
                    <h2 className='user-id'>Matches for Player {data ? data.player.steamAccount?.name : ""}</h2>
                </div>
                {data.player.matches.map((match, index) => (
                    <li className='match' key={index}>
                        <MatchBar match={match} player={match.players.find(p => p.steamAccountId === steamAccountId)} />
                        <p>Match id: {match.id}</p>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default PlayerMatches;
