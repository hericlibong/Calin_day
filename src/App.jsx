import React from 'react';
import ScrollytellingContainer from './components/ScrollytellingContainer';
import DataIntegrityNote from './components/DataIntegrityNote';
import storyData from './data/data.json';

function App() {
    return (
        <div className="font-sans text-brand-dark bg-white">
            <main className="w-full min-h-screen">
                <ScrollytellingContainer />
            </main>

            <DataIntegrityNote steps={storyData.steps} />
        </div>
    );
}

export default App;
