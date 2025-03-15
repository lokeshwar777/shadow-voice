
import React from 'react';
import CreatePostForm from '../components/posts/CreatePostForm';

const CreatePost = () => {
    return (
        <div className="app-container py-8">
            <div className="max-w-2xl mx-auto">
                <CreatePostForm />
            </div>
        </div>
    );
};

export default CreatePost;
