/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import "./styles.css"
const NavigatonBar = () => {
  const i1 = "--i:1";
  const i2 = "--i:2";
  const i3 = "--i:3";
  const i4 = "--i:4";
  const i5 = "--i:5";
  const i6 = "--i:6";
  return (
    <div class="container">
      <div>
        <ul>
          <li style={{['--i']: 6}} data-icon="&#xf015">
              <a href="#">Home</a>
          </li>
          <li style={{['--i']: 5}} data-icon="&#xf2bb">
              <a href="#">About</a>
          </li>
          <li style={{['--i']: 4}} data-icon="&#xf03a">
              <a href="#">Services</a>
          </li>
          <li style={{['--i']: 3}} data-icon="&#xf07c">
              <a href="#">Portfolio</a>
          </li>
          <li style={{['--i']: 2}} data-icon="&#xe533">
              <a href="#">Our Team</a>
          </li>
          <li style={{['--i']: 1}} data-icon="&#x40">
              <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigatonBar
