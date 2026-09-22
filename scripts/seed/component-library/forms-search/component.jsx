export function SearchForm({ onSubmit }) {
  return <form role="search" onSubmit={onSubmit}><label>Search<input name="query" type="search" /></label><button>Search</button></form>;
}