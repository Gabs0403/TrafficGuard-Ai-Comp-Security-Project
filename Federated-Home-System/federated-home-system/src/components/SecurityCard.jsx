import React from 'react';

const SecurityCard = ({theme}) => (
  <div className={`card mb-2 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
    <div className="card-body">
      <h5>Current Network Security Overall Status <span className="badge bg-success">Secure</span></h5>
      <hr/>
      <h6>Detected Threats: <span className="badge bg-primary me-2"> 0 </span></h6>
      <div className="d-flex" role="group" aria-label="Detected Threats">
      </div>
    </div>
  </div>
);

export default SecurityCard;
