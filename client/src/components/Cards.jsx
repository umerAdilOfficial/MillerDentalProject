import React from 'react'

function Cards({value , title}) {
  return (
        <div  style={{width : "33%"}}>
  <div className="card text-center shadow-sm">
    <div className="card-body">
      <h6 className="card-title text-muted">{title}</h6>
      <h2 className="fw-bold">{value}</h2>
    </div>
  </div>
</div>
  )
}

export default Cards