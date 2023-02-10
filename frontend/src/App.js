import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { TablePageContainer } from './containers';

import { Template } from './pages/Template';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Template />} />
            <Route exact path="/student/:keywords" element={<TablePageContainer />} />
            <Route path="*" element={<> </>} />
        </Routes>
    </BrowserRouter>
);

export default App;
