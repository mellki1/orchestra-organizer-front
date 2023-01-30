import './Music.css'
import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';

const isHarpValues = [
    {
        'key': 'true',
        'value': 'Sim'
    },
    {
        'key': 'false',
        'value': 'Não'
    },
]

function Music() {
    const { state: music } = useLocation();


    const [name, setName] = useState(music.name);
    const [composer, setComposer] = useState(music.composer);
    const [isHarp, setIsHarp] = useState(music.isHarp);
    const [lastDayPlayed, setLastDayPlayed] = useState(music.lastDayPlayed);

    const handleChangeIsHarp = (event) => {
        setIsHarp(event.target.value)
    }

    const handleChangeLastDayPlayed = (event) => {
        setLastDayPlayed(event.target.value);
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeCompositor = (event) => {
        setComposer(event.target.value);
    }

    const handleSubmit = async (event) => {
        await api.put('music', {
            name,
            composer,
            isHarp,
            lastDayPlayed
        })
            .then((result) => {
                const musicUpdated = result.data;
                setName(musicUpdated.name);
                setComposer(musicUpdated.composer);
                setIsHarp(musicUpdated.isHarp);
                setLastDayPlayed(musicUpdated.lastDayPlayed);
            }).catch((err) => {
                alert(err.response.data.message);
            });
    }

    return (
        <div className='music-container'>
            <h2>Musica</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='music'>
                    <label>ID</label>
                    <input value={music.id} disabled />
                </div>
                <div className='music'>
                    <label>Nome da música</label>
                    <input value={name} onChange={handleChangeName} />
                </div>
                <div className='music'>
                    <label>Compositor</label>
                    <input value={composer} onChange={handleChangeCompositor} />
                </div>
                <div className='music'>
                    <label>É da harpa</label>
                    <select onChange={(e) => handleChangeIsHarp(e)} value={isHarp}>
                        {isHarpValues.map(columnToFind => (
                            <option key={columnToFind.key} value={columnToFind.key}>{columnToFind.value}</option>
                        ))}
                    </select>
                </div>
                <div className='music'>
                    <label>Ultimo dia tocado</label>
                    <input value={lastDayPlayed} type='date' onChange={(e) => handleChangeLastDayPlayed(e)} />
                </div>
                <button className='button' >Atualizar</button>
            </form>

        </div>
    );
}

export default Music;