interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => (
  <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
    {['Tous', ...categories].map(cat => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        style={{
          padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
          border: '1px solid #6366f1',
          background: selected === cat ? '#6366f1' : 'transparent',
          color: selected === cat ? '#fff' : '#6366f1',
        }}
      >
        {cat}
      </button>
    ))}
  </div>
)

export default CategoryFilter
