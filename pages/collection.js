import Header from "../components/Header";
import FocusGraph from "../components/FocusGraph";

export default function Collection() {

    return (
  
      <div className="w-100 min-h-screen">
        <Header />
        <div className="h-24"></div>
        <FocusGraph className="fixed"/>
      </div>
  
    )
  
  }