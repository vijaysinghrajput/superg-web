import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const validateOtp = ({ mobile }) => {
    return new Promise((resolve, reject) => {
        fetch(URL + "/APP-API/App/insetuserByPhone", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                mobile,
                login_source: 'Android'
                // login_source: 'Website'
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                cookies.set('isUserLogin', true, { maxAge: 9999999999 });
                cookies.set('userID', btoa(responseJson.data[0].id), { maxAge: 9999999999 });
                cookies.set('userProvider_id', btoa(responseJson.data[0].provider_id), { maxAge: 9999999999 });
                cookies.set('userName', btoa(responseJson.data[0].name), { maxAge: 9999999999 });
                cookies.set('userMobile', btoa(responseJson.data[0].mobile), { maxAge: 9999999999 });
                resolve(responseJson.data[0]);
                // data.setUserLogin({ user_info: responseJson.data[0] });
                // lastPage ? navigate(lastPage) : navigate("/")
            })
            .catch((error) => {
                //  console.error(error);
            })
    });
}


export const sendOTP = ({ mobile }) => {
    return new Promise((resolve, reject) => {
        fetch(URL + "/APP-API/App/sendOtp", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                mobile,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.otp) {
                    resolve({
                        otp: responseJson.otp,
                        status: true
                    })
                }
                // navigate("/verification", { state: { OTP: responseJson.otp, mobile, lastPage: location.state } });
            })
            .catch((error) => {
                //  console.error(error);
            });
    })
}