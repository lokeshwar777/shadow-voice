import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        setTimeout(() => {
            const mockUser = {
                id: "1",
                name: "John Doe",
                username: "johndoe",
                email: "john@example.com",
                createdAt: new Date(),
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            };
            setUser(mockUser);
            setIsLoading(false);
        }, 1000);
    }, []);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const mockUser = {
                id: "1",
                name: "John Doe",
                username: "johndoe",
                email: email,
                createdAt: new Date(),
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            };
            setUser(mockUser);
            toast({
                title: "Login successful",
                description: "Welcome back!",
            });
        } catch (error) {
            toast({
                title: "Login failed",
                description: "Please check your credentials and try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email, password, name, username) => {
        try {
            setIsLoading(true);
            const mockUser = {
                id: "1",
                name: name,
                username: username,
                email: email,
                createdAt: new Date(),
                image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            };
            setUser(mockUser);
            toast({
                title: "Registration successful",
                description: "Your account has been created.",
            });
        } catch (error) {
            toast({
                title: "Registration failed",
                description: "Please try again with different information.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            setUser(null);
            toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
            });
        } catch (error) {
            toast({
                title: "Logout failed",
                description: "An error occurred during logout.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
