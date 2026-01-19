import { useState } from 'react';
import './accordian.css'
const Accordian = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }
  return (
    <div className="accordion-wrapper" >
      <div className="accordion">
        <details open={activeIndex === 0}>
          <summary onClick={() => handleToggle(0)}>React</summary>
          Web Components allow the developer to divide the HTML website into
          chunks of reusable customized code.
        </details>

        <details open={activeIndex === 1} >
          <summary onClick={() => handleToggle(1)}>Accessbility</summary>
          Building a Web Component uses four different specifications in the
          browser to construct, configure and generate their internal workings.
        </details>

        <details open={activeIndex === 2}>
          <summary onClick={() => handleToggle(2)}>detials</summary>
          HTML structure elements are often repeated to make sure each one works
          the same as the last. Instead, to save some time and reduce errors,
        </details>

        <details open={activeIndex === 3}>
          <summary onClick={() => handleToggle(3)}>summary</summary>
          The most important feature of web components is the use of custom
          elements.
        </details>
      </div>
    </div>
  );
};
export default Accordian;
