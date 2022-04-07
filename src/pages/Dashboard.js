import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import useFetch from '../utils/useFetch';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchIntance = useFetch();
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const { response, data } = await fetchIntance(`${BASE_URL}/stores`);
        setStores(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    bootstrapAsync();
  }, []);
  return (
    !loading && (
      <div>
        <h1>Admin</h1>
        <h2>Liste des tâches</h2>
        <ul>
          {stores['hydra:member'].map((store) => (
            <li key={store.id}>
              <span>{store.siret}</span> -<span>{store.location}</span> -
              <span>{store.manager}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Dashboard;
