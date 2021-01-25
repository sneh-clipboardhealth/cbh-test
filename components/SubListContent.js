import { useState } from "react";

import { SubListDetail } from "./SubListDetail";
export function SubListContent({ item }) {
  const [detail, SetDetail] = useState(false);
  function toggleDetail() {
    SetDetail((p) => !p);
  }
  return (
    <>
      <div className="py-2 px-5 hover:bg-blue-100" onClick={toggleDetail}>
        <h4 className="font-medium">{item.job_title}</h4>
        <p>
          {item.job_type} | $ {item.salary_range[0]} - {item.salary_range[1]}an
          hour | {item.city}
        </p>
      </div>
      {detail ? <SubListDetail item={item} /> : null}
    </>
  );
}
