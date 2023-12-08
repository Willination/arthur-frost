// src/components/Intro.js
import React from 'react';

const Intro = ({ introText }) => {
    return (
        <div className="mb-5">
            <h1 className="mb-4">About Dr. Arthur Frost</h1>
            <div dangerouslySetInnerHTML={{ __html: introText }} />
        </div>
    );
};

export default Intro;