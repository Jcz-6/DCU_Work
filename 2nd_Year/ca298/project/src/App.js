import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Degree from './components/Degree';
import DegreeList from './components/DegreeList';
import DegreeForm from './components/DegreeForm';
import CohortList from './components/CohortList';
import Cohort from './components/Cohort';
import CohortForm from './components/CohortForm';
import ModuleList from './components/ModuleList';
import Module from './components/Module';
import ModuleCohort from './components/ModuleCohort';
import ModuleForm from './components/ModuleForm';
import Students from './components/Students';
import Student from './components/Student';
import StudentForm from './components/StudentForm';
import GradeForm from './components/GradeForm';
import HomePage from './components/Homepage';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';



function App() {


  return (
    <div>
      <header>
        <Header/>
      </header>
      <body>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/degrees" element={<DegreeList/>}/>
              <Route path="/cohorts" element={<CohortList/>}/>
              <Route path="/cohort/:id" element={<Cohort/>}/>
              <Route path="/module/cohort/:id" element={<ModuleCohort/>}/>
              <Route path="/newCohort" element={<CohortForm/>}/>
              <Route path="/deegres/degree/:shortcode" element={<Degree/>} /> 
              <Route path="/newDegree" element={<DegreeForm/>}/>
              <Route path="/modules" element={<ModuleList/>}/>
              <Route path="/module/:code" element={<Module/>}/>
              <Route path="/newModule" element={<ModuleForm/>}/>
              <Route path="/students" element={<Students/>}/>
              <Route path="/student/:student_id" element={<Student/>}/>
              <Route path="/newStudent" element={<StudentForm/>}/>
              <Route path="/setGrade" element={<GradeForm/>}/>

            </Routes>
          </BrowserRouter>
          
      </body>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
