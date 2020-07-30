import React, {useEffect, useState} from 'react';
import {Spinner, Table} from 'react-bootstrap';
import {client} from '../../utils/api';
import {Search} from 'react-bootstrap-icons';
import {Link} from "react-router-dom";

const Storage = () => {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function data() {
            setLoading(true);
            const response = await client('storage');
            setLoading(false);
            setStages(response.data);
        }

        data();
    }, []);

    return (
        <div>
            <h4 className="display-4">Storages</h4>
            {loading && <Spinner animation="border" variant="primary" className="mb-3 mt-1"/>}
            {!loading && stages.length === 0 && <div className="ml-1">Use storage seeder</div>}
            {stages.length > 0 &&
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {stages.map(({id, name, created_at}, i) => (
                    <tr key={id}>
                        <td></td>
                        <td>{name}</td>
                        <td>{created_at}</td>
                        <td>
                            <Link to={`/storage-item/${id}`}>
                                <Search></Search>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>}
        </div>
    );
};

export default Storage;
