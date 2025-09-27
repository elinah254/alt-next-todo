import styles from '../styles/Pagination.module.css';

function Pagination({ page, setPage }) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
