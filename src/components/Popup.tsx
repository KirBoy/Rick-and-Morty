import React, {Dispatch, FC, SetStateAction, useRef} from 'react';
import {CharactersType, FiltersType} from "../types";

type PopupType = {
    user: CharactersType
    setPopup: Dispatch<SetStateAction<CharactersType | null>>;
}

const Popup: FC<PopupType> = ({user, setPopup}) => {
    const modal = useRef(null)

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modal.current == e.target) {
            setPopup(null)
        }

    }
    const date = new Date(user.created)

    return (
        <div className='popup' onClick={closeModal} ref={modal}>
            <div className='popup_inner'>
                <img className='char_img char_img--big' src={user.image} alt=""/>
                <div>
                    <h2 className='char_name'>{user.name}</h2>
                    <div className='char_info'>
                        <span className='char_desc'>Status</span>
                        <span>{user.status}</span>
                    </div>
                    <div className='char_info'>
                        <span className='char_desc'>Gender</span>
                        <span>{user.gender}</span>
                    </div>
                    <div className='char_info'>
                        <span className='char_desc'>Species</span>
                        <span>{user.species}</span>
                    </div>
                    {user.type &&
                    <div className='char_info'>
                        <span className='char_desc'>Type</span>
                        <span>{user.type}</span>
                    </div>}
                    <div className='char_info'>
                        <span className='char_desc'>Last known location</span>
                        <span>{user.origin.name}</span>
                    </div>
                    <div className='char_info'>
                        <span className='char_desc'>Last known location endpoint</span>
                        <span>{user.location.name}</span>
                    </div>
                    <div className='char_info'>
                        <span className='char_desc'>Created at</span>
                        <span>{date.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
