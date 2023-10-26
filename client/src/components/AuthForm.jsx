import { useState, useContext } from "react";
import { ProfileContext } from '../context/ProfileProvider';

const AuthForm = () => {

    const signUpFormValues = {
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        checkEmail: "",
        password: "",
        passwordCheck: ""
    };

    const loginFormValues = {
        displayName: "",
        password: ""
    };

    const userErrorMessages = {
        passwordError: "",
        emailError: ""
    };

    const [toggleForms, setToggleForms] = useState(false);

    const [signUpFormData, setSignUpForm] = useState(signUpFormValues);

    const [loginFormData, setLoginFormData] = useState(loginFormValues);

    const [errorMessage, setErrorMessage] = useState(userErrorMessages);

    const [highLight, setHighLight] = useState("login")

    const { signup, login } = useContext(ProfileContext);

    function signUpHandleChange (e) {
        const { name, value } = e.target
            setSignUpForm(prevData => ({
                ...prevData,
                [name]: value
            }))
    }

    function loginHandleChange (e) {
        const { name, value } = e.target
        setLoginFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSignUp (e) {

        e.preventDefault();

            const { password, passwordCheck, email, checkEmail } = signUpFormData;

                if(password !== passwordCheck) {
                    setErrorMessage(prevError => ({...prevError, passwordError: "Passwords do NOT match!"}))
                }
                if(email !== checkEmail) {
                    setErrorMessage(prevError => ({...prevError, emailError: "Emails do NOT match!"}))
                }
                if(password === passwordCheck && email === checkEmail) {
                    console.log("sign up complete")
                    signup(signUpFormData)
                }
    }

    function handleLogin (e) {
        e.preventDefault();
            login(loginFormData)
    }

    function changeForm () {
        setToggleForms(prev => !prev);
    }
    
    function navToLogin () {
        setToggleForms(true)
    }

    function navToSignup() {
        setToggleForms(false)
    }

return (
<div className="auth--page">
        <span className="auth-header">
            <h1>
                App Name
            </h1>
        </span>

    {toggleForms ?
        <form onSubmit={handleLogin} className="auth--login-form">
            <div className="form--toggles">
                <h2 onClick={navToLogin} className="highlight-login">Login</h2>
                <h2 onClick={navToSignup}>Create Account</h2>
            </div>
            <h2>
                 Sign In
            </h2>
        <input
        type="text"
        name="displayName"
        value={loginFormData.displayName}
        required
        placeholder="Diplay Name"
        onChange={loginHandleChange}
        />
        <input
        type="password"
        name="password"
        value={loginFormData.password}
        required
        placeholder="Password"
        onChange={loginHandleChange}
        />
        <button>Sign in</button>
        <p></p>
    </form>

        :

    <form onSubmit={handleSignUp} className="auth--sign-up-form">
        <div className="form--toggles">
            <h2 onClick={navToLogin} >Login</h2>
            <h2 onClick={navToSignup} className="highlight-signin">Create Account</h2>
        </div>
        <h2>
            Sign Up For an Account
        </h2>
        <input
        type="text"
        name="displayName"
        value={signUpFormData.displayName}
        placeholder="Display Name"
        required
        minLength={4}
        maxLength={10}
        onChange={signUpHandleChange}
        />

        <input
        type="password"
        name="password"
        value={signUpFormData.password}
        required
        minLength={6}
        maxLength={20}
        placeholder="Password"
        onChange={signUpHandleChange}
        autoComplete="true"
        />

        <input
        type="password"
        name="passwordCheck"
        value={signUpFormData.passwordCheck}
        required
        minLength={6}
        maxLength={20}
        placeholder="Verify Password"
        onChange={signUpHandleChange}
        autoComplete="true"
        />
        {errorMessage.passwordError && <p>{errorMessage.passwordError}</p>}

        <input
        type="text"
        name="firstName"
        value={signUpFormData.firstName}
        required
        minLength={2}
        maxLength={20}
        placeholder="First Name"
        onChange={signUpHandleChange}
        autoComplete="true"
        />

        <input
        type="text"
        name="lastName"
        value={signUpFormData.lastName}
        required
        minLength={2}
        maxLength={20}
        placeholder="Last Name"
        onChange={signUpHandleChange}
        autoComplete="true"
        />

        <input
        type="email"
        name="email"
        value={signUpFormData.email}
        required
        placeholder="MyEmail@gmail.com"
        onChange={signUpHandleChange}
        autoComplete="true"
        />

        <input
        type="email"
        name="checkEmail"
        value={signUpFormData.checkEmail}
        required
        placeholder="Verify Email"
        onChange={signUpHandleChange}
        autoComplete="true"
        />
        {errorMessage.emailError && <p>{errorMessage.emailError}</p>}

        <button>Sign up</button>
        <p></p>
    </form>}

</div>
)
}
 
export default AuthForm