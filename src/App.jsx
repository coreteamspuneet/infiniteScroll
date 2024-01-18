import { useRef, useState, useCallback } from "react";
import useBookSearch from "./useBookSearch"
function App() {


  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const {
    books,
    error,
    hasMore,
    loading
  } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible', entries[0])
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node);
    console.log('node', node);
  }, [loading, hasMore])


  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <>
      <div>
        {/* <input type="text" ></input> */}
        <input type="text" name="" id="" value={query} onChange={handleSearch} />
        {books?.map((book, index) => {
          if (books.length === index + 1) {
            return <div ref={lastBookElementRef} key={book}>{book}</div>
          } else {
            return <div key={book}>{book}</div>
          }
        })}
        <p>{loading && 'Loading ...'}</p>
        <p>{error && 'Error'}</p>
      </div>
    </>
  )
}

export default App
