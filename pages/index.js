import { useEffect, useState } from 'react';
import useSwr from 'swr';

import { NavBar } from '../components/NavBar';
import { Content } from '../sections/Content';
import { LeftFilters } from '../sections/LeftFilters';
import { SearchBar } from '../components/SearhBar';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Index = () => {
  const [finalQuery, setFinalQuery] = useState('');

  const { data } = useSwr(`/api/jobs${finalQuery}`, fetcher);
  const [query, setQuery] = useState({
    limit: 10,
    sort: '',
    sortType: '',
    search: '',
    filterType: '',
    filterValue: '',
  });

  function QueryBuilder() {
    let q = '?';
    if (query.sort) {
      q += `&sort=${query.sort}`;
    }
    if (query.sortType) {
      q += `&sortType=${query.sortType}`;
    }
    if (query.search) {
      q += `&search=${query.search}`;
    }
    if (query.filterType) {
      q += `&filterType=${query.filterType}&filterValue=${query.filterValue}`;
    }
    setFinalQuery(q);
  }

  useEffect(() => {
    QueryBuilder();
  }, [query]);

  function handleSort({ sort, sortType }) {
    setQuery((prevState) => ({
      ...prevState,
      sort,
      sortType,
    }));
  }

  function handleSearch(search) {
    setQuery((prevState) => ({
      ...prevState,
      search,
    }));
  }

  function handleFilter(obj) {
    setQuery((prevState) => ({
      ...prevState,
      filterType: obj.filterType,
      filterValue: obj.filterValue,
    }));
  }
  return (
    <>
      <div className="grid space-y-3 ">
        <NavBar handleFilter={handleFilter} />
        <div>
          <SearchBar handleSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-5 gap-4 ">
          <div className="grid space-y-4 hidden sm:block ">
            <LeftFilters
              handleFilter={handleFilter}
              filterValue={query.filterValue}
              filterType={query.filterType}
            />
          </div>
          <div className="col-span-4">
            {data ? (
              <Content
                jobs={data.jobs}
                handleSort={handleSort}
                sort={query.sort}
                sortType={query.sortType}
                total={data.count}
              />
            ) : <div className="flex justify-center content-center h-3/4">
                <button type="button" class="bg-rose-600" disabled>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  </svg> Loading... </button>
              </div>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
