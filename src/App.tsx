import Intro from "./components/Intro/Intro";
import Navbar from "./components/Navbar/Navbar";
import WorkSpace from "./components/WorkSpace/WorkSpace";

import "./App.css";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#08090a]">
      <Navbar />

      <main>
        <section id="intro-section">
          <div className="px-4 xl:px-25 2xl:px-55 pt-18">
            <Intro />
          </div>
        </section>

        <section id="workspace-section">
          <div className="px-4 xl:px-25 2xl:px-55 py-9">
            <WorkSpace />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
