import './Home.css'
import { React, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../services/api';

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
    },
];


function Home() {

    const [musics, setMusics] = useState([]);

    useEffect(() => {
        api.get('music')
            .then((result) => {
                setMusics(result.data)
            }).catch((err) => {
                alert(err.response.data.message);
            });
    });

    return (
        <div className='home-container'>
            <h2>Ultimos hinos tocados</h2>

            <div className='grid'>
                <DataGrid
                    rows={musics}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>

    );
}

export default Home;