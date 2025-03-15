import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Index from "./pages/Index";
import Posts from "./pages/Posts";
import Polls from "./pages/Polls";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import CreatePost from "./pages/CreatePost";
import CreatePoll from "./pages/CreatePoll";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/polls" element={<Polls />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/create-post" element={<CreatePost />} />
                            <Route path="/create-poll" element={<CreatePoll />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
