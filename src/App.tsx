// src/App.tsx

import React from 'react';

const App: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">LinkedIn Reply Assistant</h1>
            <p className="mt-4">This extension helps you generate replies to LinkedIn messages.</p>
        </div>
    );
};

export default App;
