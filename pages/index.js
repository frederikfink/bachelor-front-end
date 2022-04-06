import styles from '../styles/Home.module.css'

import Graph from "../components/Graph"
import Header from '../components/Header'
import data from "../data/data.json"

export default function Home() {

  return (

    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Graph data={data} />
      </main>
    </div>
  )

}