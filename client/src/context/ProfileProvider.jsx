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

    // we will need to do the same when adding items, because we are pulling them from teh profile,
    // which is being set on Login, I cant re-fire the login function to update the profle state,
    //so we will handle that here...
    function addItemToProfileItemsForSale(item) {
        setProfileData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                itemsForSale:[...prevData.profile.itemsForSale, item]
            }
        }))
    }

    function addItemToProfileSearchItems(item) {
            setProfileData(prevData => ({
                ...prevData,
                profile: {
                    ...prevData.profile,
                    itemsSearchingFor: [...prevData.profile.itemsSearchingFor, item]
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
    addItemToProfileItemsForSale,
    addItemToProfileSearchItems,
    profile,
    token
}}>
    {children}
</ProfileContext.Provider>
)
}
 
export { ProfileContextProvider, ProfileContext }