import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import Graph from "../components/Graph"
import Header from '../components/Header'
import data from "../data/data.json"
import FocusGraph from "../components/FocusGraphWrapper";
import Table from '../components/Table';

export default function Home() {

  return (

    <>
      <Header />
      <div className="container m-auto">
        <div className="h-24"></div>
        i am index page need to be pretty :D 
        <br />
        <Link href={`/collection/all`}><p className="text-blue-600 text-2xl cursor-pointer">click here ot list all</p></Link>
      </div>
    </>

  )
}