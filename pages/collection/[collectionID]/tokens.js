import { useRouter } from 'next/router'
import Table from '../../../components/Table';

export default function Test() {

  const router = useRouter()

  return (
    <div className="container m-auto">

      <Table />

    </div>

  )

}