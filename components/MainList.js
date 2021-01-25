import { MainListContent } from './MainListContent';

export function MainList({ jobs }) {
  return (
    <>
      <div className="grid grid-rows-20">
        {jobs.map((e) => (
          <MainListContent item={e} />
        ))}
      </div>
    </>
  );
}
