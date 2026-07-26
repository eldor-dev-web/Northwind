import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage"; // <--- Mana bu qator qo'shildi

function App() {
    const { isLoaded } = useAuth();

    if (!isLoaded) return <PageLoader />;

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;