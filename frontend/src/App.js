import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AllCoursesPageContainer, TablePageContainer } from './containers';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<AllCoursesPageContainer />} />
            <Route exact path="/student/:keywords" element={<TablePageContainer />} />
            <Route path="*" element={<> </>} />
        </Routes>
    </BrowserRouter>
);

export default App;
