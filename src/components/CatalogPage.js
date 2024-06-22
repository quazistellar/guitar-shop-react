import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CatalogPage() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectedConfigs, setSelectedConfigs] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedStringsCounts, setSelectedStringsCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    if (selectedTypes.includes(value)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== value));
    } else {
      setSelectedTypes([...selectedTypes, value]);
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    if (selectedForms.includes(value)) {
      setSelectedForms(selectedForms.filter((item) => item !== value));
    } else {
      setSelectedForms([...selectedForms, value]);
    }
  };

  const handleConfigChange = (e) => {
    const value = e.target.value;
    if (selectedConfigs.includes(value)) {
      setSelectedConfigs(selectedConfigs.filter((item) => item !== value));
    } else {
      setSelectedConfigs([...selectedConfigs, value]);
    }
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    if (selectedCompanies.includes(value)) {
      setSelectedCompanies(selectedCompanies.filter((item) => item !== value));
    } else {
      setSelectedCompanies([...selectedCompanies, value]);
    }
  };

  const handleStringsCountChange = (e) => {
    const value = e.target.value;
    if (selectedStringsCounts.includes(value)) {
      setSelectedStringsCounts(selectedStringsCounts.filter((item) => item !== value));
    } else {
      setSelectedStringsCounts([...selectedStringsCounts, value]);
    }
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedForms([]);
    setSelectedConfigs([]);
    setSelectedCompanies([]);
    setSelectedStringsCounts([]);
    setSearchTerm('');
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const formMatch = selectedForms.length === 0 || selectedForms.includes(product.form);
    const configMatch = selectedConfigs.length === 0 || selectedConfigs.includes(product.configsound);
    const companyMatch = selectedCompanies.length === 0 || selectedCompanies.includes(product.company);
    const stringsCountMatch = selectedStringsCounts.length === 0 || selectedStringsCounts.includes(product.stringscount);
    return nameMatch && typeMatch && formMatch && configMatch && companyMatch && stringsCountMatch;
  });

  return (
    <div className="page">
      <h2>Каталог</h2>
      <div className="search-filter-container">
        <div className="search-bar">
          <input type="text"
            placeholder="🔍 Отыскать.."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        <div className="filters">
          <div className="form-group">
            <label htmlFor="typeSelect">Тип:</label>
            <select className="form-control" multiple={true} id="typeSelect" value={selectedTypes} onChange={handleTypeChange}>
              <option value="Электрогитара">Электрогитара</option>
              <option value="Акустическая гитара">Акустическая гитара</option>
              <option value="Классическая гитара">Классическая гитара</option>
              <option value="Укулеле">Укулеле</option>
              <option value="Электроакустическая гитара">Электроакустическая гитара</option>
              <option value="Бас-гитара">Бас-гитара</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="formSelect">Форма:</label>
            <select className="form-control" multiple={true} id="formSelect" value={selectedForms} onChange={handleFormChange}>
              <option value="Dreadnought">Dreadnought</option>
              <option value="Folk">Folk</option>
              <option value="Superstrat">Superstrat</option>
              <option value="Stratocaster">Stratocaster</option>
              <option value="Telecaster">Telecaster</option>
              <option value="Les Paul">Les Paul</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="configSelect">Конфигурация:</label>
            <select className="form-control" multiple={true} id="configSelect" value={selectedConfigs} onChange={handleConfigChange}>
              <option value="H-H">H-H</option>
              <option value="J">J</option>
              <option value="H-S">H-S</option>
              <option value="S-S-S">S-S-S</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="companySelect">Фирма:</label>
            <select className="form-control" multiple={true} id="companySelect" value={selectedCompanies} onChange={handleCompanyChange}>
              <option value="GIBSON">Gibson</option>
              <option value="IBANEZ">Ibanez</option>
              <option value="SCHECTER">SCHECTER</option>
              <option value="ROCKDALE">ROCKDALE</option>
              <option value="JACKSON">JACKSON</option>
              <option value="FENDER">FENDER</option>
              <option value="MARTINEZ">MARTINEZ</option>
              <option value="FLIGHT">FLIGHT</option>
              <option value="AIERSI">AIERSI</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stringsCountSelect">Струны:</label>
            <select className="form-control" multiple={true} id="stringsCountSelect" value={selectedStringsCounts} onChange={handleStringsCountChange}>
              <option value="7">Семиструнная</option>
              <option value="6">Шестиструнная</option>
              <option value="4">Четырехструнная</option>
            </select>
          </div>
          <button className="btn btn-warning" onClick={handleClearFilters}>Очистить фильтры</button>
        </div>
      </div>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Произошла ошибка: {error.message}</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top img-fluid"
                  style={{ height: '270px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Цена: {product.price} ₽</p>
                  <Link to={`/products/${product.id}`}  className="btn btn-warning">
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;