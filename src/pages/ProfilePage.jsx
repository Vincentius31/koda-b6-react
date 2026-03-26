import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import { PrimaryButton } from '../components/PrimaryButton'
import { Mail, MapPin, Phone, User } from 'lucide-react'
import Input from '../components/Input'
import Password from '../components/Password'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

// INI YANG BERUBAH: Kita import http dan BASE_URL
import http, { BASE_URL } from '../lib/http'

export default function ProfilePage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        joinDate: "Loading...",
        image: "",
        password: ""
    });

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const formatJoinDate = (dateString) => {
        if (!dateString) return "Unknown";
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const result = await http("/profile", { token });
                if (result && result.success) {
                    const data = result.data;

                    let imageUrl = "";
                    if (data.profile_picture) {
                        if (data.profile_picture.startsWith("http")) {
                            imageUrl = data.profile_picture;
                        } else {
                            imageUrl = `${BASE_URL}/uploads/users/${data.profile_picture}`;
                        }
                    }

                    setProfile({
                        fullname: data.fullname || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        address: data.address || "",
                        joinDate: formatJoinDate(data.created_at),
                        image: imageUrl,
                        password: ""
                    });
                }
            } catch (error) {
                console.error("Error mengambil profil:", error);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleUploadClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            setProfile((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        const token = localStorage.getItem("token");

        try {
            // PROSES A: Upload Gambar
            if (selectedImageFile) {
                const formData = new FormData();
                formData.append("profile_image", selectedImageFile);

                // INI YANG BERUBAH: Menggunakan BASE_URL dinamis untuk upload gambar
                const uploadRes = await fetch(`${BASE_URL}/profile/upload`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });

                const uploadData = await uploadRes.json();
                if (!uploadData.success) {
                    throw new Error(uploadData.message || "Gagal mengunggah foto profil");
                }
            }

            // PROSES B: Update Data Teks
            const payload = {
                fullname: profile.fullname,
                phone: profile.phone,
                address: profile.address,
            };

            if (profile.password.trim() !== "") {
                payload.password = profile.password;
            }

            const result = await http("/profile", {
                method: "PATCH",
                token: token,
                body: payload
            });

            if (result && result.success) {
                setMessage("Profile updated successfully!");
                setProfile(prev => ({ ...prev, password: "" }));
                setSelectedImageFile(null);
                alert("Profile updated successfully!");
            } else {
                setMessage(result.message || "Gagal mengupdate profil.");
            }
        } catch (error) {
            console.error("Error update profil:", error);
            setMessage(error.message || "Terjadi kesalahan pada server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar className='bg-black' />

            <main className="py-12 mt-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-8">Profile</h1>

                    {message && (
                        <div className={`p-4 mb-6 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {message}
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* LEFT - Profile Card */}
                        <section className="w-full md:w-1/4 bg-white shadow p-4 flex flex-col items-center">
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

                            <div className="text-center leading-tight mb-3 flex flex-col gap-2">
                                <p className="text-sm font-semibold">{profile.fullname || "Guest"}</p>
                                <p className="text-[11px] text-gray-500">{profile.email}</p>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg, image/jpg"
                                className="hidden"
                            />
                            <PrimaryButton onClick={handleUploadClick}>
                                Upload New Photo
                            </PrimaryButton>

                            <span className="text-[10px] text-gray-400 mt-2">
                                Since {profile.joinDate}
                            </span>
                        </section>

                        {/* RIGHT - Profile Form */}
                        <section className="w-full md:flex-1 bg-white shadow p-6">
                            <form className="space-y-5" onSubmit={handleUpdateProfile}>
                                <Input
                                    label={"Full Name"}
                                    type={"text"}
                                    placeholder={"Enter Your Full Name"}
                                    icon={User}
                                    value={profile.fullname}
                                    onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
                                />

                                <Input
                                    label={"Email"}
                                    type={"email"}
                                    placeholder={"Enter Your Email"}
                                    icon={Mail}
                                    value={profile.email}
                                    disabled
                                />

                                <Input
                                    label={"Phone"}
                                    type={"text"}
                                    placeholder={"Enter Your Phone"}
                                    icon={Phone}
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                />

                                <div className='flex flex-col justify-between'>
                                    <Password
                                        label={"Password"}
                                        placeholder={"******** (Ketik untuk mengganti sandi)"}
                                        value={profile.password}
                                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                    />
                                </div>

                                <Input
                                    label={"Address"}
                                    type={"text"}
                                    placeholder={"Enter Your Address"}
                                    icon={MapPin}
                                    value={profile.address}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                />

                                <PrimaryButton type="submit" disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Submit"}
                                </PrimaryButton>
                            </form>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}