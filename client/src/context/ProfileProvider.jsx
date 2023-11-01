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

    function editProfileForSaleItemsState (itemsArray, item_id) {
        // when deleting items from the profile's items arrays and the items collection in the DB,
        // it is taking too long for the updates
        // to return, in this function, we will modify the array here in state similtanously to keep 
        // everything up to date for the user
        const updatedArray = itemsArray.filter(item => item._id !== item_id);

        return setProfileData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                itemsForSale: updatedArray
            }
        }))
    }

    function editProfileSearchingItemsState (itemsArray, item_id) {

        const updatedArray = itemsArray.filter(item => item._id !== item_id)

        setProfileData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                itemsSearchingFor: updatedArray
            }
        }))
    }

return (
<ProfileContext.Provider
value={{
    signup,
    login,
    logout,
    resetErrorMessage,
    editProfileForSaleItemsState,
    editProfileSearchingItemsState,
    profile,
    token
}}>
    {children}
</ProfileContext.Provider>
)
}
 
export { ProfileContextProvider, ProfileContext }