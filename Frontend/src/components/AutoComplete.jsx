import React from 'react'

const AutoComplete = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <gmpx-place-autocomplete
        placeholder="Search for a place"
        style={{
          width: "300px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      ></gmpx-place-autocomplete>
    </div>
  )
}

export default AutoComplete