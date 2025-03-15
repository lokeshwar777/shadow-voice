import React from "react";
import CreatePollForm from "../components/polls/CreatePollForm";

const CreatePoll = () => {
    return (
        <div className="app-container py-8">
            <div className="max-w-2xl mx-auto">
                <CreatePollForm />
            </div>
        </div>
    );
};

export default CreatePoll;
