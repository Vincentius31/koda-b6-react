import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key) {
                if (e.newValue === null) {
                    setValue(initialValue);
                } else {
                    setValue(JSON.parse(e.newValue));
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        localStorage.setItem(key, JSON.stringify(value));

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key, value, initialValue]);

    return [value, setValue];
}