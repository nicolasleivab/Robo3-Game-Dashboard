import React from 'react';
import './App.module.css';
import Layout from './components/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Layout>
          <Dashboard/>
      </Layout>
    </div>
  );
}

export default App;
