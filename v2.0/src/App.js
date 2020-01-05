import React from 'react';
import './App.module.css';
import Layout from './components/Layout/Layout';
import GroupedChart from './components/GroupedChart/GroupedChart';

function App() {
  return (
    <div>
      <Layout>
          <GroupedChart/>
      </Layout>
    </div>
  );
}

export default App;
