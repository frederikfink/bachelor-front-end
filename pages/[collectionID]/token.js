
// Importing useRouter()
import Link from 'next/link'
import { useRouter } from 'next/router'
import FocusGraph from "../../components/FocusGraphWrapper";
import Header from '../../components/Header';

const tokens = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID

    return (

        <div>
            <p>collection = {collectionID}</p>
            tokenslist
        </div>

    );
}

export default tokens;