import { useAuth, Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import Layout from "./components/Layout"; // Layout import qilinganiga ishonch hosil qil

function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Layout>
      <header className="flex gap-4 items-center mb-6">
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>

      <p className="text-red-500 font-extrabold text-4xl mb-4">Hello</p>
      
      <div className="flex gap-3">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-lg">Click me</button>
        <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-4 py-2 rounded-lg">Click me</button>
        <button className="border border-white hover:bg-white hover:text-black text-white font-semibold px-4 py-2 rounded-lg">Click me</button>
      </div>
    </Layout>
  );
}

export default App;