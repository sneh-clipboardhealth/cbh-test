import { FilterComponent } from "../components/FilterComponent";
import useSwr from "swr";
import { useEffect, useState } from "react";

const filter = [
  {
    title: "job type",
    list: [
      {
        key: "Per-Diem",
        doc_count: 1991,
      },
      {
        key: "Traveler",
        doc_count: 1976,
      },
      {
        key: "Part-time",
        doc_count: 1938,
      },
      {
        key: "Full-time",
        doc_count: 1848,
      },
    ],
  },

  {
    title: "job type",
    list: [
      {
        key: "Per-Diem",
        doc_count: 1991,
      },
      {
        key: "Traveler",
        doc_count: 1976,
      },
      {
        key: "Part-time",
        doc_count: 1938,
      },
      {
        key: "Full-time",
        doc_count: 1848,
      },
    ],
  },
];
const fetcher = (url) => fetch(url).then((res) => res.json());

export function LeftFilters({ handleFilter, filterValue, filterType }) {
  const { data, error } = useSwr(`/api/filters`, fetcher);
  const titleArray = {
    job_type: "Job Title",
    work_schedule: "Work Schedule",
    experience: "Experience",
    department: "Department",
  };

  function createList(data) {
    const arr = [];

    for (const [key, value] of Object.entries(data)) {
      arr.push(
        <div className="grid flex sm:mx-4:" key={key}>
          <FilterComponent
            title={key}
            list={value}
            handleFilter={handleFilter}
          />
        </div>
      );
    }
    return arr;
  }
  const [filterDivs, setFilterDivs] = useState([]);

  useEffect(() => {
    if (data) {
      setFilterDivs(createList(data));
    }
  }, [data]);
  function CancelFilter() {
    handleFilter({
      filterType: "",
      filterValue: "",
    });
  }
  return (
    <>
      <div className="grid">
        {filterValue ? (
          <div className="flex bg-white mb-3 py-4">
            <button
              className="px-2 py-2 mx-2 flex bg-gray-200 rounded-md "
              onClick={CancelFilter}
            >
              {`${titleArray[filterType]} : ${filterValue}`}
              <svg
                class="h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ) : null}
        {filterDivs}
      </div>
      {/* {filter.map((e) => (
        <>
          <div className="grid mx-4">
            <FilterComponent title={e.title} list={e.list} />
          </div>
        </>
      ))} */}
    </>
  );
}
