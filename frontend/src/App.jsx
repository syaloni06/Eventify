import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";

function App() {
  return (
    <>
      <Provider store={userStore}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
}

export default App;
