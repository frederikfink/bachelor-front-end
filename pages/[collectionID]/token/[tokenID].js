
// Importing useRouter()
import Link from 'next/link'
import { useRouter } from 'next/router'
import FocusGraph from "../../../components/FocusGraphWrapper";
import Header from '../../../components/Header';

const collection = () => {

    // Initializing useRouter()
    const router = useRouter()
    const collectionID = router.query.collectionID
    const tokenID = router.query.tokenID

    return (
        <>
            <p>collection = {collectionID}</p>
            <p>token = {tokenID}</p>
            token view
        </>
    );
}

export default collection;