import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal';
import { loadUser } from './actions/authActions';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <div>
      <AppNavbar />
      <Container>
         <ItemModal />
      <ShoppingList />
      </Container>
     
    </div>
    </Provider>
  );
}

export default App;
