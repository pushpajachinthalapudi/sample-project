import React, { useState, useEffect } from 'react';
import './BottomSheet.css';

function BottomSheet() {
  const [position, setPosition] = useState('closed');
  const [prevPosition, setPrevPosition] = useState('closed');
  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!dragging) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        const snapPoints = {
          closed: 0.8, // 80% from the top
          halfOpen: 0.5, // 50% from the top
          fullyOpen: 0.1, // 10% from the top
        };

        const closedDistance = snapPoints.closed * windowHeight;
        const halfOpenDistance = snapPoints.halfOpen * windowHeight;
        const fullyOpenDistance = snapPoints.fullyOpen * windowHeight;

        if (scrollY < halfOpenDistance) {
          setPosition('closed');
        } else if (scrollY < fullyOpenDistance) {
          setPosition('half-open');
        } else {
          setPosition('fully-open');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dragging]);

  const handleDragStart = (event) => {
    setDragging(true);
    setDragStartY(event.clientY || event.touches[0].clientY);
  };

  const handleDragEnd = (event) => {
    setDragging(false);
    const dragEndY = event.clientY || event.changedTouches[0].clientY;
    const dragDistance = dragEndY - dragStartY;

    
    const snapThreshold = 50; 

    if (dragDistance > snapThreshold) {
      setPrevPosition(position);
      setPosition('closed');
    } else if (dragDistance < -snapThreshold) {
      setPrevPosition(position);
      setPosition('fully-open');
    } else {
      
      setPosition(prevPosition);
    }
  };

  const handleOpenSheet = () => {
    setPrevPosition(position);
    setPosition('fully-open');
  };

  const handleCloseSheet = () => {
    setPrevPosition(position);
    setPosition('closed');
  };

  return (
    <div
      className={`bottom-sheet ${position} ${dragging ? 'dragging' : ''}`}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
    >
      
      <div className="bottom-sheet-content">
        <h2>Bottom Sheet Content</h2>
        <p>Its Great to work with you people</p>
        <button>Click Me</button>
        <p>I am Pushpaja. Looking Forward for your Response..</p>
      </div>

      <div className="bottom-sheet-buttons">
        <button onClick={handleOpenSheet}>Open</button>
        <button onClick={handleCloseSheet}>Close</button>
      </div>
    </div>
  );
}

export default BottomSheet;
