
import React, { useState } from 'react';

const Timeline = ({ timelineData }) => {
    const [filterCategory, setFilterCategory] = useState(''); // State for filtering
    const [sortOrder, setSortOrder] = useState('desc'); // State for sorting

    const filteredTimeline = timelineData.filter((item) =>
        filterCategory ? item.Category === filterCategory : true
    );

    const sortedTimeline = filteredTimeline.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.CreateDate - b.CreateDate;
        } else {
            return b.CreateDate - a.CreateDate;
        }
    });

    return (
        <div>
            <h2 className="mt-4 mb-3">Timeline</h2>
            <div className="mb-3">
                {/* Filter Dropdown */}
                <label className="me-2">Filter by Category:</label>
                <select
                    className="form-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {/* Add unique categories dynamically */}
                    {Array.from(new Set(timelineData.map((item) => item.Category))).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Sort Dropdown */}
                <label className="ms-3 me-2">Sort by Date:</label>
                <select
                    className="form-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Oldest first</option>
                    <option value="desc">Newest first</option>
                </select>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                {sortedTimeline.map((item) => (
                    <div>
                        <h2 className="mt-4 mb-3">Timeline</h2>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {timelineData.map((item) => (
                                <div key={item.Id} className="col">
                                    <div className="card h-100">
                                        <img
                                            src={`https://arthurfrost.qflo.co.za/${item.Image.replace('\\/', '/')}`}
                                            alt={item.Title}
                                            className="card-img-top"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.Title}</h5>
                                            <p className="card-text">Episode: {item.Episode}</p>
                                            <p className="card-text">Description: {item.Description}</p>
                                            <p className="card-text">Category: {item.Category}</p>
                                            <audio controls className="mb-2">
                                                <source
                                                    src={`https://arthurfrost.qflo.co.za/${item.Audio.replace('\\/', '/')}`}
                                                    type="audio/mp3"
                                                />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;