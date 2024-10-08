import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoticeBoard from './Components/NoticeBoard';
import NoticeDetail from './Components/NoticeDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoticeBoard />} />
        <Route path="/posts/:id" element={<NoticeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
