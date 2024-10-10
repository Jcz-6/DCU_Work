import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Success from './components/Success';
import Report from './components/Report';
import Login from './components/Login';
import Message from './components/Message';
import Register from './components/Register';
import Layout from './hocs/Layout';
import Dashboard from './components/Dashboard';
import Socket from './components/Socket';
import VetDashboard from './components/VetDashboard';
import OrgTest from './components/OrgTest';
import Chat from './components/Chat';
import PrivateRoute from './hocs/PrivateRoute';
import VetRoute from './hocs/VetRoute';
import OrgRoute from './hocs/OrgRoute';
import VetSchedules from './components/VetSchedules';
import AddNewSchedule from './components/AddNewSchedule';
import VetChat from './components/VetChat';
import OrgDashboard from './components/OrgDashboard';
import ExperimentMes from './components/ExperimentMes';
import OrgReport from './components/OrgReport';

function App() {
  return (
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/chat/:id" element={<Chat/>}/>
                <Route path="/socket" element={<Socket/>}/>
                <Route element={<PrivateRoute/>}>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/message" element={<ExperimentMes/>}/>
                  <Route path="/report" element={<Report/>}/>
                  <Route path="/org_report" element={<OrgReport/>}/>
                </Route>
                <Route element={<VetRoute/>}>
                  <Route path="/vet" element={<VetDashboard/>}/>
                  <Route path="/vet_s" element={<VetSchedules/>}/>
                  <Route path="/message_vet" element={<ExperimentMes/>}/>
                  <Route path="/chat/:id" element={<VetChat/>}/>
                </Route>
                <Route element={<OrgRoute/>}>
                  <Route path="/org" element={<OrgDashboard/>}/>
                  <Route path="/message_org" element={<ExperimentMes/>}/>
                </Route>
              </Routes>
            </Layout>
          </BrowserRouter>
  );
}

export default App;
