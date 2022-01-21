import React, {Dispatch, FC, SetStateAction} from 'react';
import {CharactersType} from "../types";

type CharactersList = {
    chars: CharactersType[] | null;
    isLoading: boolean;
    setPopup: Dispatch<SetStateAction<CharactersType | null>>;
}

type CharacterType = {
    char: CharactersType;
    setPopup: Dispatch<SetStateAction<CharactersType | null>>;
}

const Characters: FC<CharactersList> = ({chars, isLoading, setPopup}) => {

    if (isLoading) {
        return (
            <ul className='characters'>
                <div className='loader'></div>
            </ul>
        )
    }

    return (
        <ul className='characters'>
            {!chars && <p className='error'>There is nothing here</p>}
            {chars?.map(el => <Character key={el.id} char={el} setPopup={setPopup}/>)}
        </ul>
    );
};


const Character: FC<CharacterType> = ({char, setPopup}): JSX.Element => {

    const openModal = () => {
        setPopup(char)
    }
    return (
        <li className='char' onClick={openModal}>
            <img className='char_img' src={char.image} alt=""/>
            <div className='char_inner'>
                <h2 className='char_name'>{char.name}</h2>
                <div className='char_info'>
                    <span className='char_desc'>Status</span>
                    <span>{char.status}</span>
                </div>
                <div className='char_info'>
                    <span className='char_desc'>Gender</span>
                    <span>{char.gender}</span>
                </div>
                <div className='char_info'>
                    <span className='char_desc'>Species</span>
                    <span>{char.species}</span>
                </div>
            </div>
        </li>

    );
};


export default Characters;