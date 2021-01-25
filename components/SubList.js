import { SubListContent } from './SubListContent';

export function SubList({ items }) {
  return (
    <>
      {items.map((item) => (
        <>
          <hr />
          <SubListContent item={item} />
        </>
      ))}
    </>
  )
}