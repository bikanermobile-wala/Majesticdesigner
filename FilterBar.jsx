export default function FilterBar({ options, value, onChange, label = 'Filter' }) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          className={`filters__btn ${value === o.key ? 'is-active' : ''}`}
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
