import useAuthStore from "../stores/AuthStore";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from 'react-router';
import api from '../api.js';
import { toast } from 'react-hot-toast';
import { useState } from "react";


export default function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
    const navigate = useNavigate();
    const registerAuth = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/';
    const error = searchParams.get('error');
    const [googleSubmmiting, setGoogleSubmmiting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await registerAuth(data.name, data.email, data.password);
            navigate(redirectTo);
        } catch (err) {
            console.error(err);
        }
    }
    const handleGoogleClick = async () => {
        setGoogleSubmmiting(true);
        try {
            const res = await api.get('/auth/google');
            window.location.href = res.data.url;
        } catch (err) {
            toast.error(err?.response?.data?.msg || 'Something went wrong.')
        }
        setGoogleSubmmiting(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex">
            {/* Left hero / visual */}
            <aside className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden bg-gradient-to-tr from-indigo-600 via-pink-500 to-rose-400 text-white">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-white/5 to-transparent" />
                <div className="relative z-10 p-12 max-w-md">
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">Cart<span className="text-amber-300">ify</span></h1>
                        <p className="mt-3 text-lg font-medium text-white/90">Curated finds. Fast shipping. Unforgettable style.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm shadow-lg">
                            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3 3h18v4H3z'/><path d='M5 11h14v10H5z'/></svg>" alt="product" className="w-12 h-12 rounded-lg" />
                            <div>
                                <div className="text-sm font-semibold">Join Today</div>
                                <div className="text-xs text-white/80">Members save 15% on their first order</div>
                            </div>
                            <div className="ml-auto text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Member Perk</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white/8 rounded-2xl backdrop-blur-sm">
                                <div className="text-xs uppercase font-semibold tracking-wide">Exclusive</div>
                                <div className="text-sm font-medium mt-1">Early access sales</div>
                            </div>
                            <div className="p-3 bg-white/8 rounded-2xl backdrop-blur-sm">
                                <div className="text-xs uppercase font-semibold tracking-wide">Rewards</div>
                                <div className="text-sm font-medium mt-1">Earn points & discounts</div>
                            </div>
                        </div>
                    </div>
                </div>

                <svg className="absolute -bottom-20 -right-20 w-96 opacity-20" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><g transform="translate(300,300)"><circle r="260" fill="url(#g)" /></g><defs><radialGradient id="g"><stop offset="0%" stopColor="#ffffff"stopOpacity="0.18" /><stop offset="100%" stopColor="#ffffff"stopOpacity="0" /></radialGradient></defs></svg>
            </aside>

            {/* Right: registration card */}
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-xl">
                    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                        <div className="md:flex">
                            {/* Left slim accent (visible on md) */}
                            <div className="hidden md:block md:w-1/3 bg-gradient-to-b from-rose-50 via-white to-white p-8">
                                <div className="h-full flex flex-col justify-center gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-rose-600">Join Us</h3>
                                        <p className="text-sm text-gray-600 mt-1">Create your account to start shopping and earn rewards.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs uppercase text-gray-400 font-semibold">Why register?</div>
                                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                            <li>Get personalized recommendations</li>
                                            <li>Save shipping details</li>
                                            <li>Unlock member-only offers</li>
                                        </ul>
                                    </div>
                                    <div className="text-xs text-gray-400">By registering, you agree to our <a className="underline">Terms</a> & <a className="underline">Privacy</a>.</div>
                                </div>
                            </div>

                            {/* Right content */}
                            <div className="w-full md:w-2/3 p-8">
                                <div className="mb-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-extrabold">Create Account</h2>
                                        <div className="text-sm text-gray-500">Already have an account? <Link to='/login' className="font-medium text-rose-600">Sign in</Link></div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Use your email to register or continue with Google below.</p>
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} aria-label="register form">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <div className="mt-1">
                                            <input {...register('name', { required: 'Name is required' })} type="text" required autoComplete="name" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Your full name" />
                                            {errors.name && <p className="text-red-500 text-[0.7rem] sm:text-sm">{errors.name.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <div className="mt-1">
                                            <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} type="email" required autoComplete="email" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="you@company.com" />
                                            {errors.email && <p className="text-red-500 text-[0.7rem] sm:text-sm">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <div className="mt-1 relative">
                                            <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be atleast 6 characters.' } })} type={showPassword ? "text" : "password"} required autoComplete="new-password" className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Create a password" />
                                            {errors.password && <p className="text-red-500 text-[0.7rem] sm:text-sm">{errors.password.message}</p>}
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">{showPassword ? 'Hide' : 'Show'}</button>
                                        </div>
                                    </div>


                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`relative w-full inline-flex justify-center items-center gap-3 rounded-xl font-semibold px-4 py-3 transition-all duration-300 ${isSubmitting
                                                ? "bg-gradient-to-r from-rose-300 to-pink-400 text-white shadow-lg cursor-wait"
                                                : "bg-rose-600 text-white shadow hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                                                }`}
                                        >
                                            <span
                                                className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ${isSubmitting ? "opacity-100 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 animate-[pulse_1.5s_ease-in-out_infinite]" : ""
                                                    }`}
                                            ></span>

                                            {isSubmitting ? (
                                                <>
                                                    <svg
                                                        className="animate-spin h-5 w-5 text-white relative z-10"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        ></path>
                                                    </svg>
                                                    <span className="relative z-10">Creating Account...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 relative z-10"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path d="M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M5 12h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span className="relative z-10">Register</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-px bg-gray-200" />
                                        <div className="text-xs uppercase text-gray-400 font-semibold">or</div>
                                        <div className="flex-1 h-px bg-gray-200" />
                                    </div>

                                    <div>
                                        <button
                                            onClick={handleGoogleClick}
                                            type="button"
                                            disabled={googleSubmmiting}
                                            className={`relative w-full inline-flex items-center justify-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${googleSubmmiting
                                                ? "bg-gray-100 cursor-wait opacity-80"
                                                : "border-gray-200 hover:bg-gray-50 active:scale-95"
                                                }`}
                                        >
                                            {googleSubmmiting ? (
                                                <>
                                                    <svg
                                                        className="animate-spin h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        ></path>
                                                    </svg>
                                                    <span>Connecting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 533.5 544.3"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.3H272v95.1h147.3c-6.4 34.1-26.6 62.9-56.7 82.1v68.2h91.6c53.6-49.3 84.3-122 84.3-195.1z"
                                                            fill="#4285F4"
                                                        />
                                                        <path
                                                            d="M272 544.3c73.6 0 135.4-24.3 180.6-65.9l-91.6-68.2c-25.5 17.4-58 27.8-89 27.8-68.4 0-126.4-46.4-147.2-108.6H30v68.3C75.5 481.5 167.5 544.3 272 544.3z"
                                                            fill="#34A853"
                                                        />
                                                        <path
                                                            d="M124.8 327c-10-29.3-10-60.9 0-90.2V168.5H30c-39.9 78.4-39.9 171.9 0 250.3l94.8-91.8z"
                                                            fill="#FBBC05"
                                                        />
                                                        <path
                                                            d="M272 107.6c38.8-.6 75.8 14.3 103.8 40.3l77.7-77.7C406.7 24.6 343.6 0 272 0 167.5 0 75.5 62.8 30 168.5l94.8 68.8C145.6 154 203.6 107.6 272 107.6z"
                                                            fill="#EA4335"
                                                        />
                                                    </svg>
                                                    <span>Continue with Google</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-center text-sm text-gray-500">
                                        Already have an account? <a className="underline text-rose-600">Sign in</a>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    {/* Subtle footer */}
                    <div className="mt-6 text-center text-xs text-gray-400">© {new Date().getFullYear()} Shopify — join the future of commerce</div>
                </div>
            </main>
        </div>
    );
}