import CategorySection from '../components/CategorySection'

const CATEGORIES = [
  { id: 'education', name: 'Education' },
  { id: 'health', name: 'Health' },
  { id: 'judiciary', name: 'Judiciary' },
  { id: 'administration', name: 'Administration' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'fashion', name: 'Fashion & Design' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'fabrication', name: 'Fabrication' },
  { id: 'security', name: 'Security' }
]

export default function Home() {
  return (
    <div>
      {CATEGORIES.map((category) => (
        <CategorySection
          key={category.id}
          heading={category.name}
          sector={category.id}
        />
      ))}
    </div>
  )
}
