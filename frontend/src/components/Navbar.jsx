import { useUser, SignInButton, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { 
    PackageIcon, 
    Settings, 
    ShoppingBagIcon, 
    StoreIcon,
    ShoppingCartIcon,
    LogInIcon
} from "lucide-react";

const Navbar = () => {
    const { user, isSignedIn } = useUser();

    const role = user?.publicMetadata?.role;
   const cartCount = useCart((s) => s.items?.reduce((acc, line) => acc + line.quantity, 0) || 0);
    
    return (
        <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 shadow-sm backdrop-blur-md">
            <div className="navbar mx-auto min-h-14 max-w-7xl px-4 py-4 py-2.5 md:px-6 md:py-3">
                <div className="flex-1">
                    <Link 
                        to="/"
                        className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl"
                    >
                        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 p-1 text-primary">
                            <StoreIcon className="size-8" aria-hidden />
                        </span>
                        <span className="leading-none">Northwind</span>
                    </Link>
                </div>

                <nav className="flex items-center gap-1 md:gap-1.5">
                    <Link to="/" className="btn btn-ghost gap-2 font-medium">
                        <ShoppingBagIcon className="size-6 opacity-90" aria-hidden />
                        <span className="hidden sm:inline">Shop</span>
                    </Link>

                    {isSignedIn && (
                        <>
                            <Link to="/orders" className="btn btn-ghost gap-2 font-medium">
                                <PackageIcon className="size-6 opacity-90" aria-hidden />
                                <span className="hidden sm:inline">Orders</span>
                            </Link>

                            {role === "admin" && (
                                <Link to="/admin" className="btn btn-ghost gap-2 font-medium text-secondary">
                                    <Settings className="size-6 opacity-90" aria-hidden />
                                    <span className="hidden sm:inline">Admin</span>
                                </Link>
                            )}

                            <Link 
                                to="/cart"
                                className="btn btn-ghost gap-2 font-medium indicator"
                                aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : "Cart"}
                            >
                                {cartCount > 0 ? (
                                    <span className="indicator-item badge badge-sm badge-primary min-w-2 px-1.5 font-sans text-xs tabular-nums">
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </span>
                                ) : null}
                                <ShoppingCartIcon className="size-6 opacity-90" aria-hidden />
                                <span className="hidden sm:inline">Cart</span>
                            </Link>
                        </>
                    )}

                    {!isSignedIn ? (
                        <SignInButton mode="modal">
                            <button type="button" className="btn btn-primary btn-sm gap-1.5 px-3 shadow-md">
                                <LogInIcon className="size-4 drop-shadow-sm" aria-hidden />
                                Sign in
                            </button>
                        </SignInButton>
                    ) : (
                        <div className="flex items-center gap-2 border-l border-base-300 pl-3">
                            <UserButton
                              appearance={{ elements: { avatarBox: "h-10 w-10 ring-2 ring-base-300" } }}
                             />
                            {role === "support" || role === "admin" ? (
                                <span className="badge badge-primary badge-sm hidden capitalize md:inline-flex">
                                    {role}
                                </span>
                            ) : null}
                        </div>
                    )}
                </nav>
            </div>
        </header> 
    );
};

export default Navbar;