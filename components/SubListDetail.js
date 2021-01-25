export function SubListDetail({ item }) {
  return (
    <>
      <div className="grid ">
        <div className="grid grid-cols-3">
          <div>Departments: </div>
          <div>
            {item.department.map((e) => (
              <span>{e},</span>
            ))}
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-3">
        <div>Hours/shifts </div>
          <div>
            {item.hours.map((e) => (
              <span>{e},</span>
            ))}
          </div>
          <div></div>
        </div>
      
        <div className="grid grid-cols-3">
        <div>Summary: </div>
          <div>
            {item.description}
          </div>
          <div >
              <button className='px-2 py-2 bg-blue-400 m-2 text-white rounded-lg'> Job details</button>
              <button className='px-2 py-2 m-2 text-blue-400 bg-white border-solid border-2 border-blue-400 rounded-lg'>Save job</button>
          </div>
        </div>
      </div>
    </>
  );
}
