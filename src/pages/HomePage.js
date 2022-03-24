import React, { Component }  from 'react';

function HomePage(props){
    return (
        <div>
            <h1>Welcome to ikipediaway</h1>
            <p>
                Please copy any url slug after "/wiki/" from wikipedia and enter it in the address.
                <br></br> 
                <br></br> 
                Example: <strong>https://en.wikipedia.org/wiki/Bee</strong> would be <strong>http://localhost:3000/Bee</strong> 
                <br></br> 
                <br></br> 
                You can view two examples in the top nav.
            </p>
        </div>
    );
}

export default HomePage;