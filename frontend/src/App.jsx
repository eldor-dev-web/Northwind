import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; 
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutReturnPage from "./pages/CheckoutReturnPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
    const { isLoaded, isSignedIn  } = useAuth();

    if (!isLoaded) return <PageLoader />;

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/products/:slug" element={<ProductDetailPage />} />
                     <Route
                      path="/orders"
                      element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} replace />} 
                    />
                    <Route path="/checkout/return" element={<CheckoutReturnPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
