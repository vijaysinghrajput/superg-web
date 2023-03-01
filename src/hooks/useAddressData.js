import URL from "../URL";


export const SaveAddress = async (data, type = "insert", address_id = null) => {

    const { UserID, addressType, fullName, mobile, houseNo, addressFromUser, user_city, user_full_address, state, lat, lng } = data;

    return fetch(URL + "/APP-API/App/insertUserAddress", {
        method: 'post',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            actiontype: type,
            address_id: address_id,
            UserId: UserID,
            user_name: fullName,
            user_mobile: mobile,
            user_house_no: houseNo,
            user_street: user_full_address,
            user_full_address: addressFromUser,
            user_city: user_city,
            user_addres_type: addressType,
            user_lat: lat,
            user_lng: lng,

        })


    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status == 'done') {
                return responseJson;
            }
        })
        .catch((error) => {
            //  console.error(error);
        });
}