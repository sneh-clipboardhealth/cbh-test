import jobs from '../../data/jobs.json'

function filterJobRecords(dataObject, typeName, fieldName) {
  const jobsData = [];
  for (let i = 0; i < dataObject.length; i += 1) {
    const { items } = dataObject[i];
    let mapItems = []
    if (fieldName === 'department') {
      mapItems = items.filter((item) => {
        if (item[fieldName].includes(typeName)) {
          return item;
        }
      })
    } else {
      mapItems = items.filter((item) => {
        if (item[fieldName] === typeName) {
          return item;
        }
      })
    }

    jobsData.push({ ...dataObject[i], items: mapItems })
  }
  return jobsData;
}

function filterRecord(dataObject, type, value) {
  if (type === 'job_type') return filterJobRecords(dataObject, value, 'job_type');
  if (type === 'work_schedule') return filterJobRecords(dataObject, value, 'work_schedule');
  if (type === 'experience') return filterJobRecords(dataObject, value, 'experience');
  if (type === 'department') return filterJobRecords(dataObject, value, 'experience');
  return dataObject;
}

function Search(dataObject, searchValue) {
  const searchResults = [];
  for (let i = 0; i < dataObject.length; i += 1) {
    const regSearch = new RegExp(searchValue, 'i');
    if (dataObject[i].name.match(regSearch) || dataObject[i].job_title.match(regSearch)) {
      searchResults.push(dataObject[i]);
    } else {
      const filterResult = dataObject[i].items.filter((singleItem) => {
        if (singleItem.job_title.match(regSearch) || singleItem.job_type.match(regSearch)) {
          return singleItem
        }
      })

      if (filterResult.length > 0) {
        searchResults.push(dataObject[i]);
      }
    }
  }
  return searchResults;
}

function sortByLocation(prop, type) {
  return function (a, b) {
    if (type === 'desc') {
      if (b.items[0].city > a.items[0].city) {
        return 1;
      } else if (b.items[0].city < a.items[0].city) {
        return -1;
      }
      return 0;
    } else {
      if (a.items[0].city > b.items[0].city) {
        return 1;
      } else if (a.items[0].city < b.items[0].city) {
        return -1;
      }
      return 0;
    }
  };
}

function sortInsideTheItems(prop, type) {
  return function (a, b) {
    if (type === 'desc') {
      if (b[prop] > a[prop]) {
        return 1;
      } else if (b[prop] < a[prop]) {
        return -1;
      }
      return 0;
    } else {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  };
}

function sortingRecords(prop, type = 'asc') {
  if (prop === 'location') return sortByLocation(prop, type);
  return function () { return 0 }
}

function sortingRecordsInsideHospital(dataObject, prop, type = 'asc') {
  const jsonData = [];
  for (let i = 0; i < dataObject.length; i++) {
    const sortItems = dataObject[i].items.sort(sortInsideTheItems(prop, type));
    jsonData.push({ ...dataObject[i], items: sortItems });
  }
  return jsonData;
}

export default async (req, res) => {
  res.statusCode = 200

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  const { query } = req;
  let data = jobs;

  // @todo: implementing filters and search
  if (query.filterType && query.filterValue) { data = filterRecord(data, query.filterType, query.filterValue) }
  if (query.search) { data = Search(data, query.search); }
  if (query.sort) {
    if (query.sort === 'location') data.sort(sortingRecords(query.sort, query?.sortType));
    else sortingRecordsInsideHospital(data, query.sort, query?.sortType)
  }

  // jobs count
  let jobCount = 0;
  for (let i = 0; i < data.length; i += 1) {
    jobCount += data[i].items.length;
  }

  return res.send({ count: jobCount, jobs: data })
}
