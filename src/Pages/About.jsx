import React from 'react';
import PaymenSuccess from './PaymenSuccess';
import PaymentFailure from './PaymentFailure';

const About = () => {
    return (
        <div>
            <h1>About</h1>
            {/* <PaymenSuccess /> */}
            <PaymentFailure />
        </div>
    );
};

export default About;