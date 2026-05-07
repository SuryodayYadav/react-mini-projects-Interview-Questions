//import InfiniteScrolling from './Infinite-Scrolling';
//import OtpInput from "./Otp-Input";
//import Accordian from "./accordian";
//import ProtoModal from "./modal";
//import Modal from "./modal";
//import Main from "./Password-Generator";

//import Accordian from "./components/Accordian";
//import Usage from "./effect/usage";
import ApiCalling from "./effect/calling";
import TimeOut from "./effect/timeout";
import HCLForm from "./hclform/HCLForm";
import StarRating from "./hclform/StarRating";
import OutputBasedComp from "./ltm/OutputBased";

function App() {
  return (
    <div className='App'>
      {/* <InfiniteScrolling /> */}
      {/* <OtpInput /> */}
      {/* <Main /> */}
      {/* <Accordian /> */}
      <HCLForm />
      {/* <ProtoModal /> */}
      {/* <Usage /> */}
      <ApiCalling />
      <TimeOut />
      <OutputBasedComp />
      <StarRating />
    </div>
  );
}

export default App;
