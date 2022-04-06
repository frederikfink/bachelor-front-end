import styles from '../styles/Home.module.css'

import Graph from "../components/Graph"
import Header from '../components/Header'
import data from "../data/data.json"

export default function Home() {

  return (

    <div className="">
      <Header />
      <div className="relative w-screen">
        <Graph data={data} />
        <h1 className="absolute inset-y-0 right-0">
          Explore the transactional network of your favorite <span className="font-size-22 text-blue-600">Ethereum ERC-721</span> tokens
        </h1>
      </div>
    </div>
  )

}