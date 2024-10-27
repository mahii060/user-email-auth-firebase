import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false)


    const handleForm = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        // Reset error 
        setRegisterError('');
        // Reset success
        setSuccess('')


        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password must contain a UPPER CASE letter.')
            return
        }
        else if (!/[0-9]/.test(password)) {
            setRegisterError('Your Password must contain a digit between 0-9.')
            return
        }
        else if (!accepted) {
            setRegisterError('You must agree to our terms and conditions.')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setSuccess('User Registered Successfully.')
                console.log(result, user);
            })
            .catch(error => {
                setRegisterError(error.message)
                console.error(error)
            })
    }
    return (
        <div className="px-2 sm:px-4">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-4">Please Register</h2>
                <form onSubmit={handleForm}>
                    <input className="w-full border border-black mb-2 py-2 px-4" type="email" name="email" id="" placeholder="Email" required />
                    <br />
                    <div className="relative mb-2">
                        <input className="w-full border border-black py-2 px-4"
                            type={showPassword ? "text" : "password"}
                            name="password" id="" placeholder="Password" required />
                        <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute top-3 right-2" >{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our terms and conditions</label>
                    </div>
                    <br />
                    <input className="w-full mb-2 btn btn-secondary" type="submit" value="Submit" />
                </form>
                {
                    success && <p className="text-green-700">{success}</p>
                }
                {
                    registerError && <p className="text-red-700">{registerError}</p>
                }
            </div>
        </div>
    );
};

export default Register;