import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; 
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
    const { isLoaded, isSignedIn  } = useAuth();

    if (!isLoaded) return <PageLoader />;

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                      path="/orders"
                      element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} replace />} 
                      />
                       <Router path="/checkout/return" element={<CheckoutReturnPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;