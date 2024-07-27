//
//
import React, { Component } from 'react'

import  './Layout.css'
import Navbar from '../UI/Navigation/Navbar/Navbar'


class Layout extends Component {
    render() {
        return (
            <>
            <Navbar/>
                <main className="Content">
                    {this.props.children}
                </main>
            </>
        )
    }
 }

export default Layout
