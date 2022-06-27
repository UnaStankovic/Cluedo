import React from 'react';


export const PlayerToken = ({player, active}) => {

    return(
        <div className={`player-token ${player && player} ${active && 'active'}`}>
            {active && <span>YOU</span>}
        </div>
    )
}