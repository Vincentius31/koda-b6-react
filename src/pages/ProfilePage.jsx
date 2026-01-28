import React from 'react'
import Navbar from '../components/Navbar'
import { PrimaryButton } from '../components/PrimaryButton'
import { Locate, Mail, MapPin, Phone, User } from 'lucide-react'
import Input from '../components/Input'
import Password from '../components/Password'
import Footer from '../components/Footer'

export default function ProfilePage() {
    return (
        <>
            <Navbar className='bg-black' />

            <main className="py-12 mt-20">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold mb-8">Profile</h1>

                    {/* FLEX CONTAINER */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">

                        {/* LEFT - Profile Card */}
                        <section className="w-full md:w-1/4 bg-white shadow p-4 flex flex-col items-center">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>

                            {/* Name & Email */}
                            <div className="text-center leading-tight mb-3 flex flex-col gap-2">
                                <p className="text-sm font-semibold">Ghaluh Wizard</p>
                                <p className="text-[11px] text-gray-500">
                                    ghaluhwiz@gmail.com
                                </p>
                            </div>

                            {/* Upload Button */}
                            <PrimaryButton>Upload New Photo</PrimaryButton>

                            {/* Since */}
                            <span className="text-[10px] text-gray-400 mt-2">
                                Since 20 January 2022
                            </span>
                        </section>

                        {/* RIGHT - Profile Form */}
                        <section className="w-full md:flex-1 bg-white shadow p-6">
                            <form className="space-y-5">
                                {/* Full Name */}
                                <Input label={"Full Name"} type={"text"} placeholder={"Enter Your Full Name"} icon={User} />

                                {/* Email */}
                                <Input label={"Email"} type={"email"} placeholder={"Enter Your Email"} icon={Mail} />

                                {/* Phone */}
                                <Input label={"Phone"} type={"text"} placeholder={"Enter Your Phone"} icon={Phone} />

                                {/* Password */}
                                <div className='flex flex-col justify-between'>
                                    <Password label={"Password"} placeholder={"Enter Your Password"} />
                                </div>

                                {/* Address */}
                                <Input label={"Address"} type={"text"} placeholder={"Enter Your Address"} icon={MapPin} />

                                {/* Submit */}
                                <PrimaryButton>Submit</PrimaryButton>
                            </form>
                        </section>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}
