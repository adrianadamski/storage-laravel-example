import React, {useEffect, useRef} from 'react';
import {Spinner, Table} from 'react-bootstrap';
import {client} from '../../utils/api';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addEmpty, clearData, fetchStorageItemsByStorageId} from "./storageItemSlice";
import EmptyRow from "./emptyRow";

const StorageItems = () => {
    const dispatch = useDispatch();
    const {id: storageId} = useParams();
    const isPending = useSelector((state) => state.storageItems.loading === 'pending');
    const storageItems = useSelector((state) => state.storageItems.data);
    const localItems = useSelector((state) => state.storageItems.localData);
    const pendingPromises = useRef(new Set());

    const reloadData = (storageId) => {
        const promise = dispatch(fetchStorageItemsByStorageId(storageId));
        pendingPromises.current.add(promise);
        promise.then(() => {
            pendingPromises.current.delete(promise);
        });
    }

    useEffect(() => {
        reloadData(storageId);

        return () => {
            dispatch(clearData());

            for (const pendingPromise of pendingPromises.current.values()) {
                pendingPromise.abort();
            }
        }
    }, [storageId]);

    const createInputValueSaver = (id) => (e) => {
        const value = e.target.value
        if (value === undefined || value === null) {
            return;
        }

        client(`storage-item/${id}/qty`, {
            method: 'PUT',
            body: {qty: value},
        })
    }

    const addRow = () => {
        dispatch(addEmpty());
    };

    const handleSave = () => {
        reloadData(storageId);
    }

    return (
        <div>
            <h4 className="display-4">Storage Items</h4>
            {isPending && <Spinner animation="border" variant="primary" className="mb-3 mt-1"/>}
            {!isPending && storageItems.length === 0 && <div className="ml-1">Add some item.</div>}

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
                {storageItems.length > 0 && storageItems.map(({id, name, qty, created_at}, i) => {
                    const saveInputValue = createInputValueSaver(id);

                    return <tr key={id}>
                        <td/>
                        <td>{name}</td>
                        <td><input type="number" defaultValue={qty} onBlur={saveInputValue}/></td>
                        <td>{created_at}</td>
                        <td>
                        </td>
                    </tr>
                })}
                {localItems.map(({id, saved}, i) => {
                    return <EmptyRow key={id} id={id} storageId={storageId} onSave={handleSave} saved={saved}/>
                })}
                </tbody>
            </Table>

            <button className="btn btn-primary" onClick={addRow}>Add storage item</button>
        </div>
    );
};

export default StorageItems;
