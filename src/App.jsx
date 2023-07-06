/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find((category) => category.id === product.categoryId);
  const user = usersFromServer
    .find((user) => user.id === product.userId);
});

export const App = () => {
  const [userFilter, setuserFilter] = useState('All');
  const [nameFilter, setNameFilter] = useState('');

  const onClickNameChange = (event) => {
    setNameFilter(event.target.value);
  };

  const onClickNameClear = () => {
    setNameFilter('');
  };

  const filteredProducts = products.filter((product) => {
    return (
      (userFilter === 'All' || product.owner === userFilter)
      && product.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames(
                  `${userFilter !== 'All' ? 'is-active' : ''}`
                )}
              >
                {user.id}
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={onClickNameChange}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    onClick={onClickNameClear}
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                {category.id}
              </a>
            </div>

            <div className="panel-block">
              {ownerFilter !== 'All' || nameFilter ? (
                <a
                  className="button is-link is-outlined is-fullwidth"
                  data-cy="ResetAllButton"
                  href="#/"
                  onClick={() =>
                    setuserFilter('All'),
                    setNameFilter('')
                  }
                >
                  Reset All Filters
                </a>
              )
                : null
              }
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          {filteredProducts.length === 0 && (
            <p>No results</p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            {filteredProducts.map((product) => (
              <tbody>
                <tr
                  key={product.id}
                  data-cy="Product"
                >
                  <td
                    className="has-text-weight-bold"
                    data-cy="ProductId"
                  >
                    {user.id}
                  </td>

                  <td data-cy="ProductName">{products.name}</td>
                  <td data-cy="ProductCategory">🍺 - {categories.title}</td>

                  <td
                    data-cy="ProductUser"
                    className={classNames({
                      'has-text-link': user.sex === 'm',
                      'has-text-danger': user.sex === 'f',
                    })}
                  >
                    {user.name}
                  </td>
                </tr>
              </tbody>
            )
          </table>
        </div>
      </div>
    </div>
  );
};
