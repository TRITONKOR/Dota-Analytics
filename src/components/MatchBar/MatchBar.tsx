import React, { useEffect, useState } from 'react';
import { useItems } from '../../hook/useItems';
import HeroIcon from './HeroIcon/HeroIcon';
import './matchBar.scss';

interface Item {
    id: number;
    name: string;
    displayName: string;
    image: string;
}

interface Player {
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
    gameMode: string;
}

interface Hero {
    shortName: string;
}

interface Player {
    hero: Hero;
}

interface HeroIconProps {
    player: Player;
}

const MatchBar: React.FC<{ match: Match; player: Player }> = ({ match, player }) => {

    const [playerItems, setPlayerItems] = useState<(Item | undefined)[]>([]);
    const { items, loading, error } = useItems();

    useEffect(() => {
        if (items.length > 0) {
            const playerItemIds = [
                player.item0Id,
                player.item1Id,
                player.item2Id,
                player.item3Id,
                player.item4Id,
                player.item5Id
            ];

            let playerItems = playerItemIds.map(id => items.find((item: Item) => item.id === id));
            playerItems = playerItems.map(item => {
                if (item) {
                    const updatedName = item.name.replace("item_", "") + "_lg.png?3";
                    return {
                        ...item,
                        image: updatedName
                    };
                }
                return item;
            });
            setPlayerItems(playerItems);
        }
    }, [items, player]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div className="match-container">
            <HeroIcon player={player}></HeroIcon>
            <div className={`status ${player.isVictory ? 'victory' : 'defeat'}`}>
                {player.isVictory ? 'W' : 'L'}
            </div>
            <div className='level'>
                {player.level}
            </div>
            <div className='stats'>
                {player.kills}/{player.deaths}/{player.assists}
            </div>
            <div className='stats'>
                {player.award == "NONE" ? "" : player.award}
            </div>
            <div className='space'></div>
            <div className='gameMode'>{match.gameMode}</div>
            <div className='items-container'>
                {playerItems.map((item, index) => (
                    item ? (
                        <img key={index} className='item' src={`https://cdn.dota2.com/apps/dota2/images/items/${item.image}`} alt={item.displayName} />
                    ) : (
                        <div key={index} className='item' />
                    )
                ))}
            </div>

        </div>
    );
}

export default MatchBar