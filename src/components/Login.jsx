import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        // Reset error & Reset success
        setRegisterError('');
        setSuccess('')

        // Sign in method
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    setSuccess('User logged in Successfully.')
                    console.log(result.user);
                }
                else {
                    alert('Please verify your email')
                    return
                }
            })
            .catch(error => {
                setRegisterError(error.message);
                console.error(error);
            })

    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            setRegisterError('Please provide an email address!')
            console.log('Provide an email address', emailRef.current.value);
            return
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setRegisterError('Please provide a valid email address');
            // alert('Please provide a valid email address');
            return
        }

        // Send validation email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please Check your mail')
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className="hero bg-base-200 min-h-[calc(100vh-68px)]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="Enter Email"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Enter Password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        success && <p className="text-green-700 p-2">{success}</p>
                    }
                    {
                        registerError && <p className="text-red-700 p-2">{registerError}</p>
                    }
                    <p className="p-2">New to this website? Please <Link className="underline text-blue-500" to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;