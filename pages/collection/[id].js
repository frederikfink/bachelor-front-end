
// Importing useRouter()
import Link from 'next/link'
import { useRouter } from 'next/router'
import FocusGraph from "../../components/FocusGraphWrapper";
import Header from '../../components/Header';

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.id

    return (
        <>
            <Header />
            <div className="h-24"></div>
            <Link href="/">  Go back </Link>
            <h1>collection {collectionID} </h1>
            <FocusGraph className="fixed" />
        </>
    );
}

export default collection;