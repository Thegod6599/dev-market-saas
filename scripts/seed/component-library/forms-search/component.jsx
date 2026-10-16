import './component.css';

export function SearchForm({ onSubmit, label = 'Search', placeholder = 'Search resources', buttonLabel = 'Search' }) {
  return <form className="cc-search-form" role="search" onSubmit={onSubmit}><label>{label}<input name="query" type="search" placeholder={placeholder} /></label><button type="submit">{buttonLabel}</button></form>;
}
