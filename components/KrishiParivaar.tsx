
import React, { useState } from 'react';

// --- TYPE DEFINITIONS ---
interface Reply {
    id: number;
    author: string;
    avatar: string;
    text: string;
    time: string;
}

interface Post {
    id: number;
    author: string;
    avatar: string;
    question: string;
    replies: Reply[];
    time: string;
}

// --- INITIAL DUMMY DATA ---
const initialPosts: Post[] = [
    {
        id: 1,
        author: "Ram Singh",
        avatar: "https://i.pravatar.cc/150?u=ramsingh",
        question: "My tomato plants are getting yellow leaves. What could be the reason? I have used standard fertilizer.",
        time: "3 hours ago",
        replies: [
            { id: 101, author: "Geeta Kumari", avatar: "https://i.pravatar.cc/150?u=geeta", text: "It could be a nitrogen deficiency. Try adding some compost or a nitrogen-rich fertilizer.", time: "2 hours ago" },
            { id: 102, author: "Vikram Batra", avatar: "https://i.pravatar.cc/150?u=vikram", text: "Also, check for overwatering. Yellow leaves can be a sign of root rot.", time: "1 hour ago" },
        ]
    },
    {
        id: 2,
        author: "Sita Devi",
        avatar: "https://i.pravatar.cc/150?u=sitadevi",
        question: "What is the best organic pesticide for controlling aphids on my chili plants?",
        time: "1 day ago",
        replies: [
             { id: 201, author: "Ram Singh", avatar: "https://i.pravatar.cc/150?u=ramsingh", text: "A solution of neem oil and soap water works wonders for me!", time: "22 hours ago" },
        ]
    },
];


const KrishiParivaar = () => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [newQuestion, setNewQuestion] = useState('');
    const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
    const [newReply, setNewReply] = useState('');

    const handlePostQuestion = () => {
        if (newQuestion.trim() === '') return;

        const newPost: Post = {
            id: Date.now(),
            author: "You", // In a real app, this would be the logged-in user
            avatar: "https://i.pravatar.cc/150?u=me",
            question: newQuestion,
            time: "Just now",
            replies: []
        };
        setPosts([newPost, ...posts]);
        setNewQuestion('');
    };

    const handlePostReply = (postId: number) => {
        if (newReply.trim() === '') return;

        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newReplyObject: Reply = {
                    id: Date.now(),
                    author: "You",
                    avatar: "https://i.pravatar.cc/150?u=me",
                    text: newReply,
                    time: "Just now"
                };
                return { ...post, replies: [...post.replies, newReplyObject] };
            }
            return post;
        });

        setPosts(updatedPosts);
        setNewReply('');
    };

    const toggleExpand = (postId: number) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Krishi Parivaar</h1>
                <p className="mt-2 text-lg text-text-secondary">Our farming community. Ask, share, and learn together.</p>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="bg-slate-900 text-slate-200 p-5 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-bold mb-3 text-white">Ask a Question</h2>
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="w-full p-2 border border-slate-600 rounded-md bg-slate-800 text-slate-200 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                        rows={3}
                        placeholder="Type your question here..."
                    ></textarea>
                    <button onClick={handlePostQuestion} className="mt-3 bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">Post Question</button>
                </div>

                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-slate-800 rounded-lg shadow-md text-slate-300 overflow-hidden">
                            {/* Post Summary */}
                            <div onClick={() => toggleExpand(post.id)} className="p-5 flex items-start space-x-4 cursor-pointer hover:bg-slate-700 transition-colors">
                                <img className="h-12 w-12 rounded-full" src={post.avatar} alt={post.author} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-white">{post.author}</p>
                                        <span className="text-xs text-slate-400">{post.time}</span>
                                    </div>
                                    <p className="mt-1">{post.question}</p>
                                    <div className="mt-3 flex items-center text-sm text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>
                                        <span>{post.replies.length} replies</span>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded View with Replies */}
                            {expandedPostId === post.id && (
                                <div className="bg-slate-800 px-5 py-4 border-t border-slate-700">
                                    <h4 className="font-bold text-white mb-3">Replies</h4>
                                    <div className="space-y-4">
                                        {post.replies.map(reply => (
                                            <div key={reply.id} className="flex items-start space-x-3">
                                                <img className="h-8 w-8 rounded-full" src={reply.avatar} alt={reply.author} />
                                                <div className="flex-1 bg-slate-700 p-3 rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-semibold text-sm text-white">{reply.author}</p>
                                                        <span className="text-xs text-slate-400">{reply.time}</span>
                                                    </div>
                                                    <p className="text-sm mt-1">{reply.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {post.replies.length === 0 && <p className="text-sm text-slate-400 text-center py-2">No replies yet. Be the first to answer!</p>}
                                    </div>

                                    {/* Reply Form */}
                                    <div className="mt-4 flex items-start space-x-3">
                                         <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/150?u=me" alt="You" />
                                         <div className="flex-1">
                                            <textarea
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                                className="w-full p-2 text-sm border border-slate-600 rounded-md bg-slate-700 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                                                rows={2}
                                                placeholder="Write a reply..."
                                            ></textarea>
                                            <button onClick={() => handlePostReply(post.id)} className="mt-2 bg-primary text-white font-semibold py-1 px-4 rounded-lg text-sm hover:bg-primary-dark transition-colors">Post Reply</button>
                                         </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KrishiParivaar;
