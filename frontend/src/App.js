import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";
import AllTickets from "./pages/AllTickets";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import store from "./store/store";
function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/tickets" element={<AllTickets />} />
          <Route path="/ticket-detail/:ticketID" element={<TicketDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </Provider>
  );
}

export default App;
