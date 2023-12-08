
import React from 'react';

const Intro = ({ introText }) => {
    return (
        <div className="mb-5">
            <div dangerouslySetInnerHTML={{ __html: introText }} />
        </div>
    );
};

export default Intro;