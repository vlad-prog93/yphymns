import './App.css'


import AppProviders from './AppProviders';
import AppLayout from './AppLayout';
import AppRoutes from './AppRoutes';
import AppInitializer from '@app/AppInitializer';


function App() {

  return (
    <AppProviders>
      <AppInitializer>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </AppInitializer>
    </AppProviders>
  );
}

export default App;