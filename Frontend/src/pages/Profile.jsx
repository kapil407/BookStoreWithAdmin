import axios from "axios";
import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [image, setImage] = useState(null);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      history("/");
    } else {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getUserData",
          { headers },
        );
        console.log("res in getUserdata", response);
        setProfileData(response.data);
      };
      fetch();
    }
  }, []);
  const updateProfileImage = async () => {
    try {
      if (!image) throw new Error("image is not selected ");

      const formdata = new FormData();
      formdata.append("avatar", image);
      console.log("image", image);
      setLoading(true);
      const res = await axios.post(
        "http://localhost:1000/api/v1/updateAdminProfilePic",
        formdata,
        {
          headers,
        },
      );
      console.log("res->>", res);

      setProfileData(res.data.updatedUser);
      setImage(null);
    } catch (error) {
      console.log("error->>>", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("profile data", ProfileData);
  return (
    <>
      {!ProfileData && <Loader />}
      <div className="h-auto bg-zinc-900 px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
        {ProfileData && (
          <>
            <div className="h-auto lg:h-[80vh] w-full lg:w-1/6 bg-zinc-800 rounded-lg">
              <Sidebar
                ProfileData={ProfileData}
                setImage={setImage}
                image={image}
                updateProfileImage={updateProfileImage}
                loading={loading}
              />
            </div>

            <div className="h-[100%] w-full lg:w-5/6  rounded-lg">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
