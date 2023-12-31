import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

const axiosAddCredentials = axios.create();

axiosAddCredentials.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
})

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

    function handleError(err) {
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

    // the items are persisting in localStorage, we need to either update localStorage at the same time of make another request

    function editProfileForSaleItemsState(itemsArray, item_id) {
        // when deleting items from the profile's items arrays and the items collection in the DB,
        // it is taking too long for the updates
        // to return, in this function, we will modify the array here in state similtanously to keep 
        // everything up to date for the user
        const updatedArray = itemsArray.filter(item => item._id !== item_id);
        // update state
        return setProfileData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                itemsForSale: updatedArray
            }
        }))
    }
useEffect(() => { // modifying localStorage along with state 
    if(profileData.token) {
      
        // Get the current profile data from local storage
        let localProfile = JSON.parse(localStorage.getItem("profile"));
        
        // In this part we compare the state and local data.
        // If either "itemsForSale" or "itemsSearchingFor" are not equal, we update the local storage.
        
        if(localProfile.itemsForSale !== profileData.profile.itemsForSale ||
           localProfile.itemsSearchingFor !== profileData.profile.itemsSearchingFor) {
          
            // Update the local storage with the new items
            localProfile.itemsForSale = profileData.profile.itemsForSale;
            localProfile.itemsSearchingFor = profileData.profile.itemsSearchingFor;
            
            // Convert the profile data back into a string to store in local storage.
            let updatedProfile = JSON.stringify(localProfile);
            
            // Update the local storage with the new profileData.
            localStorage.setItem("profile", updatedProfile);
        }
    }
}, [profileData])


    function editProfileSearchingItemsState(itemsArray, item_id) {

        const updatedArray = itemsArray.filter(item => item._id !== item_id)

        setProfileData(prevData => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                itemsSearchingFor: updatedArray
            }
        }))
    }

    // we will need to do the same when adding items, because we are pulling them from the profile,
    // which is being set on Login, I cant re-fire the login function to update the profile state,
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