import React from 'react';

export class Navbar extends React.Component {
    render () {
        const active = this.props.active;
        return (
            <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
              <a className='navbar-brand' href='#'>Women&#39;s March</a>
              <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
              </button>

              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>
                  <li className={ active === 'untagged' ? 'nav-item active' : 'nav-item' }>
                    <a className='nav-link' href='/'>Untagged</a>
                  </li>
                  <li className={ active === 'tagged' ? 'nav-item active' : 'nav-item' }>
                    <a className='nav-link' href='/?tagged=true'>Tagged</a>
                  </li>
                </ul>
              </div>
            </div>
        );
    }
}

// <form className='form-inline my-2 my-lg-0'>
//   <input className='form-control mr-sm-2' type='text' placeholder='Search' aria-label='Search'/>
//   <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
// </form>
