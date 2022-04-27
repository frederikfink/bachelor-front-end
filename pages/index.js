import styles from '../styles/Home.module.css'

import Graph from "../components/Graph"
import Header from '../components/Header'
import data from "../data/data.json"
import FocusGraph from "../components/FocusGraphWrapper";
import Table from '../components/Table';

export default function Home() {

  return (

    <div className="">
      <Header />
      <div className="container m-auto">
        <div className="h-24"></div>
        <div className="flex content-between w-100">
          <p>NFT collections</p>
          <p className="ml-auto">search</p>
        </div>
        <Table />
      </div>
    </div>

  )

}