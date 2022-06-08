import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();

  console.log(productId);
  return <div>ProductDetail</div>;
}
