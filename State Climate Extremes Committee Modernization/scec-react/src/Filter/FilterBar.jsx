import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FilterBar({ state, element, funct }) {
  /**
   * function that when a selection is made in the State filter, the handleFilterChange from App.jsx is called to set the
   * App.jsx state variables to the selected state
   */
  const stateSelect = (event) => {
    funct(event.target.value, element);
  };

  /**
   * function that when a element selection is made in the Element filter, the handleFilterChenge from App.sx is called,
   * setting the App.jsx variable to the chosen element
   */
  const elementSelect = (event) => {
    funct(state, event.target.value);
  };

  return (
    <div className="row mt-3">
      {/* State Dropdown */}
      <div className="col-md-6">
        <select
          id="state"
          className="form-select"
          value={state}
          onChange={
            stateSelect
          } /**When a state is chosen, stateSelect is called with event being a selection */
        >
          <option value="all">All States</option>
          <option value="al">Alabama</option>
          <option value="ak">Alaska</option>
          <option value="az">Arizona</option>
          <option value="ar">Arkansas</option>
          <option value="ca">California</option>
          <option value="co">Colorado</option>
          <option value="ct">Connecticut</option>
          <option value="de">Delaware</option>
          <option value="fl">Florida</option>
          <option value="ga">Georgia</option>
          <option value="hi">Hawaii</option>
          <option value="id">Idaho</option>
          <option value="il">Illinois</option>
          <option value="in">Indiana</option>
          <option value="ia">Iowa</option>
          <option value="ks">Kansas</option>
          <option value="ky">Kentucky</option>
          <option value="la">Louisiana</option>
          <option value="me">Maine</option>
          <option value="md">Maryland</option>
          <option value="ma">Massachusetts</option>
          <option value="mi">Michigan</option>
          <option value="mn">Minnesota</option>
          <option value="ms">Mississippi</option>
          <option value="mo">Missouri</option>
          <option value="mt">Montana</option>
          <option value="ne">Nebraska</option>
          <option value="nv">Nevada</option>
          <option value="nh">New Hampshire</option>
          <option value="nj">New Jersey</option>
          <option value="nm">New Mexico</option>
          <option value="ny">New York</option>
          <option value="nc">North Carolina</option>
          <option value="nd">North Dakota</option>
          <option value="oh">Ohio</option>
          <option value="ok">Oklahoma</option>
          <option value="or">Oregon</option>
          <option value="pa">Pennsylvania</option>
          <option value="pr">Puerto Rico</option>
          <option value="ri">Rhode Island</option>
          <option value="sc">South Carolina</option>
          <option value="sd">South Dakota</option>
          <option value="tn">Tennessee</option>
          <option value="tx">Texas</option>
          <option value="ut">Utah</option>
          <option value="vt">Vermont</option>
          <option value="vi">Virgin Islands (U.S.)</option>
          <option value="va">Virginia</option>
          <option value="wa">Washington</option>
          <option value="wv">West Virginia</option>
          <option value="wi">Wisconsin</option>
          <option value="wy">Wyoming</option>
        </select>
      </div>

      {/* Element Dropdown */}
      <div className="col-md-6">
        <select
          id="element"
          className="form-select"
          value={element}
          onChange={elementSelect}
        >
          <option value="all">All Elements</option>
          <optgroup label="Temperature">
            <option value="temp">Temperature</option>
            <option value="tmax">Maximum Temperature</option>
            <option value="tmin">Minimum Temperature</option>
          </optgroup>
          <optgroup label="Precipitation">
            <option value="prcp">Precipitation</option>
            <option value="maxp">24-Hour Precipitation</option>
            <option value="apcp">Max Annual Precipitation</option>
          </optgroup>
          <optgroup label="Snow">
            <option value="snow">Snow</option>
            <option value="maxs">24-Hour Snowfall</option>
            <option value="ssnw">Seasonal Snowfall</option>
            <option value="msnw">Monthly Snowfall</option>
            <option value="snwd">Snow Depth</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}