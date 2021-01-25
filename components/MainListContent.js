import { useState } from 'react';
import { SubList } from './SubList';

export function MainListContent({ item }) {
  const [showSubList, SetSubList] = useState(false);
  function toggleShowSubList() {
    SetSubList((p) => !p);
  }
  const arr = item.name.split(' ');
  return (
    <div className="grid">
      <div
        key={item.name}
        className="px-2 py-3 hover:bg-blue-200 bg-white mb-3"
        style={{ cursor: "pointer" }}
        onClick={toggleShowSubList}
      >
        <span className="p-2 rounded-md bg-gray-200 mr-3">
          {`${arr[0].charAt(0)}${arr[0].charAt(1).toUpperCase()}`}
        </span>
        {`${item.items?.length} jobs for ${item.name}`}
      </div>

      {showSubList ? <SubList items={item.items} /> : null}
    </div>
  );
}
