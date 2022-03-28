/**
 * @name Logo
 * @description
 * @author darcrand
 */

import React from 'react'

const Logo = ({ logo, href }) => (
  <>
    <a href={href} style={{ display: 'block', width: 32, height: 32, overflow: 'hidden' }}>
      <img src={logo} alt="" style={{ height: 32 }} />
    </a>
  </>
)

export default Logo
