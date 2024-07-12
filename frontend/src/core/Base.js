import React from 'react'
import Nav from './Nav'

const Base = ({title="My Title",discription="My Discription",className="text-white ",children})=>(
    <div>
        <Nav/>
        <div className="container-fluid">
            <div className="jumbotron  text-white text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead py-2">{discription}</p>
                </div> 
        <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
            <h4>If You Got Any Quetions,Feel Free To Reach Out!</h4>
            <button className="btn btn-warning btn-lg btn-sm rounded-pill">Contact Us</button>
        </div>
        <div className='container'>
            <span className='text-white '>An Amazing <span className='text-info'>||MERN||</span> Bootcamp</span>
        </div>

        </footer>
    </div>
)

export default Base
