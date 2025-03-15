// User interface
export const User = {
    id: "", // string
    name: "", // string
    username: "", // string
    image: "", // string (optional)
    email: "", // string
    createdAt: new Date(), // Date
};

// Post interface
export const Post = {
    id: "", // string
    content: "", // string
    authorId: "", // string
    author: User, // User (optional)
    isAnonymous: false, // boolean
    createdAt: new Date(), // Date
    updatedAt: new Date(), // Date
    likes: 0, // number
    comments: 0, // number
};

// Poll interface
export const Poll = {
    id: "", // string
    question: "", // string
    options:"", // PollOption
    authorId: "", // string
    author: User, // User (optional)
    isAnonymous: false, // boolean
    createdAt: new Date(), // Date
    expiresAt: new Date(), // Date (optional)
    totalVotes: 0, // number
};

// PollOption interface
export const PollOption = {
    id: "", // string
    text: "", // string
    votes: 0, // number
};

// Comment interface
export const Comment = {
    id: "", // string
    content: "", // string
    authorId: "", // string
    author: User, // User (optional)
    postId: "", // string
    isAnonymous: false, // boolean
    createdAt: new Date(), // Date
    updatedAt: new Date(), // Date
};