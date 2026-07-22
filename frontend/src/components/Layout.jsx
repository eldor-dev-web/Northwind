import Footer from "./Footer"
import Navbar from "./Navbar"

function Layout({children}) {
    return (
        <div className="flex flex-col min-h-svh bg-base-200 text-base-content justify-between items-start w-full">

            <Navbar />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:py-10">{children}</main>

                <Footer />
        </div>
    )
}

export default Layout;