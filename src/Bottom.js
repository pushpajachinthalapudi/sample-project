import React, { useState, useRef, useEffect } from 'react';
import './Bottom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';

const snapPoints = {
  closed: 'closed',
  halfOpen: 'half-open',
  fullyOpen: 'fully-open',
};

const BottomSheet = () => {
  
    const handleButtonClick = (newPosition) => {
        setPosition(newPosition);
      };
    

  const [position, setPosition] = useState(snapPoints.closed);
  const [startY, setStartY] = useState(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    // Add animation logic when the position changes
    sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0)';
    switch (position) {
      case snapPoints.closed:
        sheetRef.current.style.transform = 'translateY(50%)';
        break;
      case snapPoints.halfOpen:
        sheetRef.current.style.transform = 'translateY(20%)';
        break;
      case snapPoints.fullyOpen:
        sheetRef.current.style.transform = 'translateY(0)';
        break;
      default:
        break;
    }
  }, [position]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (position === snapPoints.closed || position === snapPoints.fullyOpen) {
      return;
    }

    const deltaY = e.touches[0].clientY - startY;
    const newHeight = sheetRef.current.clientHeight - deltaY;

    if (newHeight > window.innerHeight * 0.8) {
      setPosition(snapPoints.fullyOpen);
    } else if (newHeight < window.innerHeight * 0.2) {
      setPosition(snapPoints.closed);
    } else {
      setPosition(snapPoints.halfOpen);
    }
  };

  const handleTouchEnd = () => {
    // Implement logic to finalize the position after the touch ends.
    // Calculate the nearest snap point based on the current position.
    // For example, you can calculate it based on the sheet's current transform translateY value.
    const translateY = sheetRef.current.style.transform.match(/translateY\((-?\d+)%\)/);
    if (translateY) {
      const translateYValue = parseInt(translateY[1], 10);
      if (translateYValue >= 40) {
        setPosition(snapPoints.closed);
      } else if (translateYValue >= 10) {
        setPosition(snapPoints.halfOpen);
      } else {
        setPosition(snapPoints.fullyOpen);
      }
    }
  };

  return (
    <div
      className={`bottom-sheet ${position}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sheetRef}
    >
         <div className="control-buttons">
        <button onClick={() => handleButtonClick(snapPoints.closed)}>Close</button>
        <button onClick={() => handleButtonClick(snapPoints.halfOpen)}>Half Open</button>
        <button onClick={() => handleButtonClick(snapPoints.fullyOpen)}>Fully Open</button>
      </div>
      {/* Content for the bottom sheet */}

      <div className="content">
        {/* Add your content here */}
        <h2>Hello Everyone..</h2>
        <h4>I am pushpaja, Full Stack Web Developer</h4>
        <p>It's a great opportunity to do this task. Will be eagerly waiting for your response</p>
        <p>Have a Good Day!!!</p>
      </div>

      {/* Handle for user interaction */}
       <div className="handle">
      <FontAwesomeIcon icon={faGripLines} />
      </div> 
    </div>
  );
};

export default BottomSheet;