import './Music.css'
import { React, useState, useEffect } from 'react';
import api from '../../services/api';
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';

const isHarpValues = [
    {
        'key': 'true',
        'value': 'Sim'
    },
    {
        'key': 'false',
        'value': 'Não'
    },
];

function Music() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [name, setName] = useState();
    const [composer, setComposer] = useState();
    const [isHarp, setIsHarp] = useState();
    const [lastDayPlayed, setLastDayPlayed] = useState();
    const [singers, setSingers] = useState([]);
    const [allSingers, setAllSingers] = useState([]);

    useEffect(() => {
        api.get(`music/${id}`)
            .then((result) => {
                const music = result.data;
                setName(music?.name);
                setComposer(music?.composer);
                setIsHarp(music?.isHarp);
                setLastDayPlayed(music?.lastDayPlayed);
                setSingers(music?.singers);
            }).catch((err) => {
                alert(err.response.data.message);
            });


        api.get('singer')
            .then((result) => {
                setAllSingers(result.data);
            }).catch((err) => {
                alert(err.response.data.message);
            });


    }, [id]);

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

    const handleChangeSinger = (e) => {
        let singerToChange = [];
        e.forEach(singer => {
            singerToChange.push({
                id: singer.value,
                name: singer.label,
            });
        });
        setSingers(singerToChange);
    }

    const handleSubmit = async () => {
        await api.put(`music/${id}`, {
            id: id,
            name: name,
            composer: composer,
            isHarp: isHarp,
            lastDayPlayed: lastDayPlayed,
            singers: singers,
        })
            .then((result) => {
                navigate(`/`);
            }).catch((err) => {
                alert(err.response.data.message);
            });
    }

    return (
        <div className='music-container'>
            <h2>Musica</h2>

            <form onSubmit={handleSubmit}>
                <div className='attribute'>
                    <label>ID</label>
                    <input value={id} disabled />
                </div>

                <div className='attribute'>
                    <label>Nome da música</label>
                    <input value={name} onChange={handleChangeName} />
                </div>

                <div className='attribute'>
                    <label>Compositor</label>
                    <input value={composer} onChange={handleChangeCompositor} />
                </div>

                <div className='attribute'>
                    <label>É da harpa</label>
                    <select onChange={(e) => handleChangeIsHarp(e)} value={isHarp}>
                        {isHarpValues.map(columnToFind => (
                            <option key={columnToFind.key} value={columnToFind.key}>{columnToFind.value}</option>
                        ))}
                    </select>
                </div>

                <div className='attribute'>
                    <label>Ultimo dia tocado</label>
                    <input value={lastDayPlayed} type='date' onChange={(e) => handleChangeLastDayPlayed(e)} />
                </div>

                <div className='attribute'>
                    <Select
                        defaultValue={
                            singers.map(singer => (
                                {
                                    label: singer.name,
                                    value: singer.id
                                })
                            )
                        }
                        isMulti
                        name='singers'
                        options={
                            allSingers.map(singer => (
                                {
                                    label: singer.name,
                                    value: singer.id
                                })
                            )
                        }
                        className='basic-multi-select'
                        classNamePrefix='select'
                        onChange={(e) => handleChangeSinger(e)}
                    />
                </div>
                <button className='button' >Atualizar</button>
            </form>

        </div>
    );
}

export default Music;