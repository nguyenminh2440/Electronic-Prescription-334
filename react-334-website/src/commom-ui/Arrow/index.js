import React from 'react';

import './style.module.css';

export const RightArrow = ({ color }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 56 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M54.5439 20.7678C55.5202 19.7915 55.5202 18.2085 54.5439 17.2322L38.634 1.32233C37.6577 0.34602 36.0748 0.34602 35.0985 1.32233C34.1222 2.29864 34.1222 3.88155 35.0985 4.85786L49.2406 19L35.0985 33.1421C34.1222 34.1184 34.1222 35.7014 35.0985 36.6777C36.0748 37.654 37.6577 37.654 38.634 36.6777L54.5439 20.7678ZM0.76123 21.5L52.7762 21.5V16.5L0.76123 16.5L0.76123 21.5Z" fill={color} />
    </svg>
  );
}

export const LeftArrow = ({ color }) => {
  return (
    <svg width="35" height="35" viewBox="0 0 53 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.23223 17.2322C0.255924 18.2085 0.255924 19.7915 1.23223 20.7678L17.1421 36.6777C18.1184 37.654 19.7014 37.654 20.6777 36.6777C21.654 35.7014 21.654 34.1184 20.6777 33.1421L6.53553 19L20.6777 4.85786C21.654 3.88155 21.654 2.29864 20.6777 1.32233C19.7014 0.34602 18.1184 0.34602 17.1421 1.32233L1.23223 17.2322ZM53 16.5L3 16.5V21.5L53 21.5V16.5Z" fill={color} />
    </svg>
  )
}