import './Home.css'
import { React, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome do hino', width: 200 },
    {
        field: 'isHarp',
        headerName: 'É da harpa?',
        width: 130,
        valueGetter: (params) =>
            params.row.isHarp ? 'Sim' : 'Não'
    },
    {
        field: 'lastDayPlayed',
        headerName: 'Ultimo dia tocado',
        width: 150,
    },
    {
        field: 'singers',
        headerName: 'Quem canta',
        width: 200,
        valueGetter: (params) =>
            params.row.singers.map(singer => singer.name)
    },
];


function Home() {

    const [musics, setMusics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('music')
            .then((result) => {
                setMusics(result.data)
            }).catch((err) => {
                alert(err.response.data.message);
            });
    }, []);

    function handleCellDoubleClick(e) {
        navigate(`/music/${e.row.id}`);
    }

    const handleSubmit = async (event) => {
        navigate('/music/create')
    }

    return (
        <div className='home-container'>
            <h2>Ultimos hinos tocados</h2>
            <button className='button' type='submit' onClick={(e) => handleSubmit(e)}>Adicionar música</button>
            <div className='grid'>
                <DataGrid
                    rows={musics}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    onCellDoubleClick={(e) => handleCellDoubleClick(e)}
                />
            </div>
        </div>

    );
}

export default Home;