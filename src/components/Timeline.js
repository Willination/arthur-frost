import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Timeline = ({ timelineData }) => {
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loadedItems, setLoadedItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreItems = () => {
        const nextItems = timelineData.slice(loadedItems.length, loadedItems.length + 50);
        if (nextItems.length === 0) {
            setHasMore(false);
            return;
        }
        setLoadedItems((prevItems) => [...prevItems, ...nextItems]);
    };

    useEffect(() => {
        loadMoreItems();
    }, [timelineData]);

    useEffect(() => {
        const filteredItems = timelineData.filter((item) =>
            filterCategory ? item.Category === filterCategory : true
        );

        const sortedItems = filteredItems.sort((a, b) =>
            sortOrder === 'asc' ? a.CreateDate - b.CreateDate : b.CreateDate - a.CreateDate
        );

        setLoadedItems([...sortedItems]);
    }, [filterCategory, sortOrder, timelineData, loadedItems]);

    const handleFilterCategory = (category) => {
        setFilterCategory(category);
    };

    const handleSortOrder = (order) => {
        setSortOrder(order);
    };
    return (
        <div>
            <h2 className="mt-4 mb-3">Timeline</h2>
            <div className="mb-3">
                <label className="me-2">Filter by Category:</label>
                <select
                    className="form-select"
                    value={filterCategory}
                    onChange={(e) => handleFilterCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {Array.from(new Set(timelineData.map((item) => item.Category))).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <label className="ms-3 me-2">Sort by Date:</label>
                <select
                    className="form-select"
                    value={sortOrder}
                    onChange={(e) => handleSortOrder(e.target.value)}
                >
                    <option value="asc">Oldest first</option>
                    <option value="desc">Newest first</option>
                </select>
            </div>

            <InfiniteScroll
                dataLength={loadedItems.length}
                next={loadMoreItems}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {loadedItems.map((item) => (
                        <div key={item.Id} className="col">
                            <div className="card h-100">
                                <img
                                    src={`https://arthurfrost.qflo.co.za/${item.Image}`}
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
                                            src={`https://arthurfrost.qflo.co.za/${item.Audio}`}
                                            type="audio/mp3"
                                        />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Timeline;