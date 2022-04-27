
// Importing useRouter()
import Link from 'next/link'
import { useRouter } from 'next/router'
import FocusGraph from "../../components/FocusGraphWrapper";
import Header from '../../components/Header';

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID
    const tokenID = router.query.tokenID

    return (
        <div className="border-yellow-400">
            <FocusGraph data/>
        </div>
    );
}

export default collection;