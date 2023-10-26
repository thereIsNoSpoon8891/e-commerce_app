import { createContext, useState } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

function ProfileContextProvider ({children}) {



    const profileProps = {
        profile: JSON.parse(localStorage.getItem("profile")) || {},
        token: localStorage.getItem("token") || "",
        errorMessage: ""
}

    const [profileData, setProfileData] = useState(profileProps);

    const { profile, token } = profileData;

    function signup (credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(res => {
                const { profile, token } = res.data;
                    localStorage.setItem("profile", JSON.stringify(profile));
                    localStorage.setItem("token", token)
                        setProfileData(prevData => ({...prevData, token, profile}))
            })
            .catch(err => handleError(err.response.data.errorMessage))
    }
 
    function login (credentials) {
        axios.post("/api/auth/login", credentials)
            .then(res => {
                const { profile, token } = res.data;
                    localStorage.setItem("profile", JSON.stringify(profile));
                    localStorage.setItem("token", token);
                        setProfileData(prevData => ({...prevData, token, profile}));
            })
            .catch(err => handleError(err.response.data.errorMessage))
    }

    function logout () {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        setProfileData({
            profile: {},
            token: "",
            errorMessage: ""
        });
    }

    function handleError (err) {
        setProfileData(prevData => ({
            ...prevData,
            errorMessage: err
        }))
    }

    function resetErrorMessage () {
        setProfileData(prevData => ({
            ...prevData,
            errorMessage: ""
        }))
    }

return (
<ProfileContext.Provider
value={{
    signup,
    login,
    logout,
    resetErrorMessage,
    profile,
    token
}}>
    {children}
</ProfileContext.Provider>
)
}
 
export { ProfileContextProvider, ProfileContext }