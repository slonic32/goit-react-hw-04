export default function LoadMoreBtn({ onClick, filter, currentPage }) {
  return (
    <button onClick={() => onClick(filter, currentPage + 1)}>Load more</button>
  );
}
