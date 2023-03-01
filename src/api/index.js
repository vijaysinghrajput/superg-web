import Cookies from 'universal-cookie';
import Base64 from '../helper/EncodeDecode';

const cookies = new Cookies();


export const fetchAllData = async () => {
    const data = await fetch(URL + "/APP-API/App/reloadData", {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({

        })
    }).then((response) => response.json());

    return data;
};

export const fetchAllOrders = async () => {
    const userID = cookies.get("userID");
    const UserID = Base64.atob(userID);
    const data = await fetch(URL + "/APP-API/App/FetchOrders", {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            UserID
        })
    });

    return data.json();
};

export const cancelOrder = async (order_number, canceledReasion) => {
    const data = await fetch(URL + "/APP-API/App/CancelOrder", {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            order_number,
            canceledReasion
        })
    })

    return data.json();
};
