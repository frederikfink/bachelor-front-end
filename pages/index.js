import styles from '../styles/Home.module.css'

import Graph from "../components/Graph"
import Header from '../components/Header'
import data from "../data/data.json"

export default function Home() {

  return (

    <div className="">
      <Header />
      <Graph data={data} />
      <h1 className="">
        Explore the transactional network of your favorite <span className="font-size-22 text-blue-600 dark:text-green-500">Ethereum ERC-721</span> tokens
      </h1>
      <div className="test_div p-10"></div>
    </div>
  )

}