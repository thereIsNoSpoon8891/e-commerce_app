import { createContext, useState } from 'react'
import axios from 'axios';

const DataContext = createContext();

function DataContextProvider (props) {

    const { children } = props;

    const pofileProps = {
        profile: JSON.parse(localStorage.getItem("profile")) || {},
        token: localStorage.getItem("token") || ""
}

    const [profileData, setProfileData] = useState(pofileProps);

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

return (
<DataContext.Provider
value={{
    signup,
    login
}}>
    {children}
</DataContext.Provider>
)
}
 
export { DataContextProvider, DataContext }