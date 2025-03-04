"use client";
import React from "react";
import { useForm } from "react-hook-form";

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
        alert("Your message has been sent successfully!");
        reset();
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-6">
            <div className="max-w-2xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-blue-400 mb-4 text-center">Contact Us</h1>
                <p className="text-gray-400 text-center mb-6">
                    Have any questions, feedback, or need help? Send us a message!
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-300 mb-1">Your Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 mb-1">Your Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" }
                            })}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-gray-300 mb-1">Subject</label>
                        <input
                            type="text"
                            {...register("subject", { required: "Subject is required" })}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-300 mb-1">Your Message</label>
                        <textarea
                            {...register("message", { required: "Message cannot be empty" })}
                            rows="4"
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full max-w-3/15 ml-60 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
