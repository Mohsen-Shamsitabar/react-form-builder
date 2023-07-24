import { useOutlet } from "react-router-dom";
import { Header } from "./components";
import { Navbar } from "./components/Sidebar/components";

const DashboardBase = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      <main>
        <Navbar />
        <section>{outlet}</section>
      </main>
    </>
  );
};

export default DashboardBase;
