import { gql, useQuery } from '@apollo/client';
import React from 'react';
import MatchBar from '../MatchBar/MatchBar';
import './MatchList.scss';

const GET_PLAYER_MATCHES = gql`
query GetPlayerMatches($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
        steamAccount {
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
                steamAccount {
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

interface PlayerMatchesProps {
    steamAccountId: number;
}

interface Player {
    steamAccountId: number;
    isVictory: boolean;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    award: string;
    gameMode: string;
    item0Id: number;
    item1Id: number;
    item2Id: number;
    item3Id: number;
    item4Id: number;
    item5Id: number;
}

interface Match {
    id: number;
    players: Player[];
    gameMode: string;
}

interface Hero {
    shortName: string;
}

interface Player {
    hero: Hero;
}

const PlayerMatches: React.FC<PlayerMatchesProps> = ({ steamAccountId }) => {
    const { loading, error, data } = useQuery(GET_PLAYER_MATCHES, {
        variables: { steamAccountId: steamAccountId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='match-list-container'>
            <ul className='match-list'>
                <div className='user-info'>
                    <h2 className='user-id'>Matches for Player {data ? data.player.steamAccount?.name : ""}</h2>
                </div>
                {data.player.matches.map((match: Match, index: number) => {
                    const player = match.players.find(p => p.steamAccountId === steamAccountId);

                    if (!player) {
                        return (
                            <li className='match' key={index}>
                                <p>No player data found for this match.</p>
                                <p>Match id: {match.id}</p>
                            </li>
                        );
                    }
                    return (
                        <li className='match' key={index}>
                            <MatchBar match={match} player={player} />
                            <p>Match id: {match.id}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PlayerMatches;
