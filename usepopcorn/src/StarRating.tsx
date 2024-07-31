import { useMemo, useState } from 'react';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
};

const starsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'start',
};

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  className?: string;
  labels?: string[];
  onRatingSet?: (rating: number) => void;
}

export default function StarRating({
  maxRating = 5,
  defaultRating,
  color = '#fcc420',
  size = 3,
  className,
  labels,
  onRatingSet,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);

  const textStyle: React.CSSProperties = useMemo(
    () => ({
      margin: 0,
      fontSize: `${size / 1.5}rem`,
      color: color,
    }),
    [color, size],
  );

  const handleRating = (rating: number) => {
    setRating((prev) => {
      const newRating = prev !== rating ? rating : 0;
      onRatingSet?.(newRating);
      return newRating;
    });
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starsStyle}>
        {Array.from({ length: maxRating }, (_, idx) => (
          <Star
            key={idx}
            isFilled={hoverRating ? hoverRating > idx : rating > idx}
            onClick={() => handleRating(idx + 1)}
            onHoverIn={() => setHoverRating(() => idx + 1)}
            onHoverOut={() => setHoverRating(() => 0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>
        {labels
          ? labels[hoverRating ? hoverRating - 1 : rating ? rating - 1 : -1]
          : hoverRating || rating || ''}
      </p>
    </div>
  );
}

interface StarProps {
  isFilled: boolean;
  onClick: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color: string;
  size: number;
}

function Star({
  isFilled,
  onClick,
  onHoverIn,
  onHoverOut,
  color,
  size,
}: StarProps) {
  const starStyle: React.CSSProperties = {
    width: `${size}rem`,
    height: `${size}rem`,
    cursor: 'pointer',
  };
  return (
    <div
      role='button'
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFilled ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={color}
          stroke={color}
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke={color}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </div>
  );
}
