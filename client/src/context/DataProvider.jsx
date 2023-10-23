import { createContext, useState } from 'react'
import axios from 'axios';

const DataContext = createContext();

function DataContextProvider (props) {

    const { children } = props;

    const profileProps = {
        profile: JSON.parse(localStorage.getItem("profile")) || {},
        token: localStorage.getItem("token") || ""
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
            .catch(err => console.log(err))
    }
 
    function login (credentials) {
        axios.post("/api/auth/login", credentials)
            .then(res => {
                const { profile, token } = res.data;
                    localStorage.setItem("profile", JSON.stringify(profile));
                    localStorage.setItem("token", token);
                        setProfileData(prevData => ({...prevData, token, profile}));
            })
            .catch(err => console.log(err))
    }

    function logout () {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        setProfileData(profileProps)
    }

return (
<DataContext.Provider
value={{
    signup,
    login,
    logout,
    profile,
    token
}}>
    {children}
</DataContext.Provider>
)
}
 
export { DataContextProvider, DataContext }