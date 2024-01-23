import { School } from '@/pages/map'

type MapListProps = {
  setSelectedSchool: (school: School) => void
}

const MapList = ({ setSelectedSchool }: MapListProps) => {
  // temporary filler need MapList component
  return (
    <>
      <ul>
        <li>School 1</li>
        <li>School 2</li>
        <li>School 3</li>
      </ul>
    </>
  )
}

export default MapList
