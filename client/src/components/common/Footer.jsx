import React from 'react';

const Footer = () => (
  <footer>
    <hr />
    <div className="container bg-color">
      <div className="row">

        <div className="col-md-12">
          <div className="text-center">

            <h5 style={{ color: '#333' }}>
              Vanessa Ating &copy;&nbsp;
              {new Date().getFullYear()}
            </h5>

          </div>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
