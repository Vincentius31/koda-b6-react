import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Mail } from 'lucide-react';
import Input from '../../Input';
import { PrimaryButton } from '../../PrimaryButton';

export default function EditUserModal({ isOpen, onClose, user, onSave }) {
    const [formData, setFormData] = useState({ ...user });

    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Edit User</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-100 overflow-hidden">
                            <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <Input
                        label="Full Name"
                        icon={User}
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    />

                    <Input
                        label="Phone"
                        icon={Phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />

                    <Input
                        label="Address"
                        icon={MapPin}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <div className="flex-1">
                            <PrimaryButton type="submit">Save Changes</PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}