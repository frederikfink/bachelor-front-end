
// Importing useRouter()
import Link from 'next/link'
import { useRouter } from 'next/router'

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.id

    return (
        <>
        <Link href="/">  Go back </Link>
        <h1>collection {collectionID} </h1>
        </>
    );
}

export default collection;