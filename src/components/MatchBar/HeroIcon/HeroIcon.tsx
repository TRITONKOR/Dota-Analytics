import React, { useEffect, useState } from 'react';

interface Hero {
    shortName: string;
}

interface Player {
    hero: Hero;
}

interface HeroIconProps {
    player: Player;
}

const HeroIcon: React.FC<HeroIconProps> = ({ player }) => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 1200);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <div className="hero-icon">
            {isSmallScreen ? (
                <>
                    <i className={`d2mh ${player.hero.shortName}`}></i>
                </>
            ) : (
                <img
                    className="hero-icon"
                    src={`https://cdn.dota2.com/apps/dota2/images/heroes/${player.hero.shortName}_lg.png?3`}
                    alt={player.hero.shortName}
                />
            )}
        </div>
    );
};

export default HeroIcon;
