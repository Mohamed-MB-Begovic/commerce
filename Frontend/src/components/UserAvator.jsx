import { useEffect, useRef, useState } from 'react';

const UserAvator = ({ username, size = 100 }) => {
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!username) return;

    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas dimensions
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');

      // Generate a background color based on the username
      const backgroundColor = stringToColor(username);
    //   context.fillStyle = "";

      // Draw a circular background
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.fill();

      // Get the initials from the username
      const initials = getInitials(username);
      context.font = `${size / 2}px sans-serif`;
      context.fillStyle = '#fff';
    //   context.backgroundColor="bg-green-400"
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(initials, size / 2, size / 2);

      // Convert the canvas drawing to a data URL and update state
      const dataUrl = canvas.toDataURL();
      setImgSrc(dataUrl);
    }
  }, [username, size]);

  return (
    <div>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={`${username} avatar`}
          width={size}
          height={size}
          className="rounded-full"
        />
      ) : (
        // Hidden canvas for drawing purposes
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      )}
    </div>
  );
};

// Helper function to extract initials from the username
function getInitials(name) {
  if (!name) return "";
  const names = name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].charAt(0).toUpperCase();
  }
  return initials;
}

// Helper function to generate a color from a string (username)
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

export default UserAvator;
