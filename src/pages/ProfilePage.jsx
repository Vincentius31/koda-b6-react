import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import { PrimaryButton } from '../components/PrimaryButton'
import { Mail, MapPin, Phone, User } from 'lucide-react'
import Input from '../components/Input'
import Password from '../components/Password'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../components/redux/authslice'

export default function ProfilePage() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const fileInputRef = useRef(null); 

    const [profile, setProfile] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        joinDate: "",
        image: "",
        password: ""
    });

    useEffect(() => {
        if (currentUser) {
            setProfile({
                fullname: currentUser.fullname || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                address: currentUser.address || "",
                joinDate: currentUser.joinDate || "20 January 2022",
                image: currentUser.image || "",
                password: currentUser.password || ""
            });
        }
    }, [currentUser]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        dispatch(updateProfile(profile));
        alert("Profile updated successfully!");
    };

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
                            {/* Avatar Display */}
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden border border-gray-100">
                                {profile.image ? (
                                    <img
                                        src={profile.image}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="h-10 w-10 text-gray-400" />
                                )}
                            </div>

                            {/* Name & Email */}
                            <div className="text-center leading-tight mb-3 flex flex-col gap-2">
                                <p className="text-sm font-semibold">{profile.fullname || "Guest"}</p>
                                <p className="text-[11px] text-gray-500">
                                    {profile.email}
                                </p>
                            </div>

                            {/* Upload Photo */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <PrimaryButton onClick={handleUploadClick}>
                                Upload New Photo
                            </PrimaryButton>

                            {/* Since */}
                            <span className="text-[10px] text-gray-400 mt-2">
                                Since {profile.joinDate}
                            </span>
                        </section>

                        {/* RIGHT - Profile Form */}
                        <section className="w-full md:flex-1 bg-white shadow p-6">
                            <form className="space-y-5" onSubmit={handleUpdateProfile}>
                                {/* Full Name */}
                                <Input
                                    label={"Full Name"}
                                    type={"text"}
                                    placeholder={"Enter Your Full Name"}
                                    icon={User}
                                    value={profile.fullname}
                                    onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
                                />

                                {/* Email */}
                                <Input
                                    label={"Email"}
                                    type={"email"}
                                    placeholder={"Enter Your Email"}
                                    icon={Mail}
                                    value={profile.email}
                                    disabled 
                                />

                                {/* Phone */}
                                <Input
                                    label={"Phone"}
                                    type={"text"}
                                    placeholder={"Enter Your Phone"}
                                    icon={Phone}
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                />

                                {/* Password */}
                                <div className='flex flex-col justify-between'>
                                    <Password
                                        label={"Password"}
                                        placeholder={"Enter Your Password"}
                                        value={profile.password}
                                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                    />
                                </div>

                                {/* Address */}
                                <Input
                                    label={"Address"}
                                    type={"text"}
                                    placeholder={"Enter Your Address"}
                                    icon={MapPin}
                                    value={profile.address}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                />

                                {/* Submit */}
                                <PrimaryButton type="submit">Submit</PrimaryButton>
                            </form>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}