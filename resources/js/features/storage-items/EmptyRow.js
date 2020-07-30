import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {createStorageItem, removeEmpty} from "./storageItemSlice";

const EmptyRow = ({storageId, id, onSave, saved}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [qty, setQty] = useState('');

    const handleSave = (e) => {
        dispatch(createStorageItem({id, name, qty, storageId}));
    }

    useEffect(() => {
        if (saved) {
            onSave(id);
            dispatch(removeEmpty(id));
        }
    }, [saved]);

    return (
        <tr>
            <td/>
            <td><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
            <td><input type="number" value={qty} onChange={(e) => setQty(e.target.value)}/></td>
            <td>-</td>
            <td>
                <button className="btn btn-success" onClick={handleSave}>Save</button>
            </td>
        </tr>
    );
};

export default EmptyRow;
