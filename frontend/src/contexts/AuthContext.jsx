import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/';
import { useToast } from '../hooks/use-toast';

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const res = await API.get('/users/me');
                setUser(res?.data || null);
            } catch (error) {
                console.log(`Error fetching user: ${error}`);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (loginData) => {
        try {
            setIsLoading(true);
            const response = await API.post('/users/login', loginData);
            setUser(response.data.user);
            toast({
                title: 'Login successful',
                description: 'Welcome back!',
            });
            return response.data.success;
        } catch (error) {
            toast({
                title: 'Login failed',
                description: 'Please check your credentials and try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (signupData) => {
        try {
            setIsLoading(true);
            const response = await API.post('/users/register', signupData);
            setUser(response.data.user);

            toast({
                title: 'Registration successful',
                description: 'Your account has been created.',
            });
            // console.log('register response', response);
            return response.data.success;
        } catch (error) {
            toast({
                title: 'Registration failed',
                description: 'Please try again with different information.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            const response = await API.post('/users/logout');
            setUser(null);
            toast({
                title: 'Logged out',
                description: 'You have been successfully logged out.',
            });
            // console.log('logout response', response);
            return response.data.success;
        } catch (error) {
            toast({
                title: 'Logout failed',
                description: 'An error occurred during logout.',
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

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
