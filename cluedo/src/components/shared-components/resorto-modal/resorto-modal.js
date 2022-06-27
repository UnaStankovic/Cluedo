import React from 'react';


export const ResortoModal = ({className, children, title, onClose, onClick}) => {
    
    return( 
        <div className='guess-modal-wrap'>
        <div className={`guess-modal ${className && className}`}>
            <div className='guess-modal-header'>
                <span>{title}</span>
                <span className='clickable' onClick={()=> onClose()}>X</span>
            </div>
            <div className='guess-modal-content'>
                {children}
            </div>
        </div>
    </div>
    )


}