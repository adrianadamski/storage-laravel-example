import React, {useEffect, useState} from 'react';
import {Spinner, Table} from 'react-bootstrap';
import {client} from '../../utils/api';
import {Search} from 'react-bootstrap-icons';
import {Link, useRouteMatch, useParams} from "react-router-dom";

const StorageItems = () => {
    const {id} = useParams();
    const [storageItems, setStorageItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function data() {
            setLoading(true);
            const response = await client(`storage-item/${id}`);
            setStorageItems(response.data);
            setLoading(false);
        }

        data();
    }, []);

    return (
        <div>
            <h4 className="display-4">StorageItems</h4>
            {loading && <Spinner animation="border" variant="primary" className="mb-3 mt-1"/>}
            {!loading && storageItems.length === 0 && <div className="ml-1">Use storage seeder</div>}
            {storageItems.length > 0 &&
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>CreatedAt</th>
                </tr>
                </thead>
                <tbody>
                {storageItems.map(({id, name, qty, created_at}, i) => (
                    <tr key={id}>
                        <td></td>
                        <td>{name}</td>
                        <td><input type="text" value={qty}/></td>
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

export default StorageItems;
