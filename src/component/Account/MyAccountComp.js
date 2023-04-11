import React, { useContext, useEffect, useState } from "react";
import MainData from "../../context/MainContext";
import { Button, useBoolean, useToast } from "@chakra-ui/react";
const MyAccountComp = (props) => {
  const data = useContext(MainData);
  const UserData = data.user.user_info;

  const [userName, setUserName] = useState(UserData.name);
  const [userPhone, setUserPhone] = useState(UserData.mobile);
  const [userEmail, setUserEmail] = useState(UserData.email);
  const [flag, setFlag] = useBoolean();
  const toast = useToast();

  const onChange = (e) => {
    if (e.target.id === "name") {
      setUserName(e.target.value);
    } else if (e.target.id === "phone") {
      setUserPhone(e.target.value);
    } else if (e.target.id === "email") {
      setUserEmail(e.target.value);
    }
  };

  const setUserInfo = () => {
    setFlag.on();
    fetch(URL + "/APP-API/App/UpdateUserInfo", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName,
        userPhone,
        userEmail,
        id: UserData.id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson &&
          toast({
            title: "Successfully updated..!!",
            status: "success",
            duration: 7000,
            isClosable: true,
          });
        setFlag.off();
      })
      .catch((error) => {
        //  console.error(error);
      });
  };

  return (
    <>
      <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
        <h4 class="mb-4 profile-title">My account</h4>
        <div id="edit_profile">
          <div class="p-0">
            <form action="">
              <div class="form-group">
                <label for="exampleInputName1">Full Name</label>
                <input
                  onChange={onChange}
                  type="text"
                  class="form-control"
                  id="name"
                  value={userName}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputNumber1">Mobile Number</label>
                <input
                  onChange={onChange}
                  type="number"
                  class="form-control"
                  id="phone"
                  value={userPhone}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input
                  onChange={onChange}
                  type="email"
                  class="form-control"
                  id="email"
                  value={userEmail}
                />
              </div>
              <div class="text-center">
                <Button
                  isLoading={flag}
                  display={"flex"}
                  w="100%"
                  alignItems={"center"}
                  justifyContent={"center"}
                  textAlign={"center"}
                  colorScheme="green"
                  onClick={setUserInfo}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountComp;
