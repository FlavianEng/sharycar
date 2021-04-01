import React from 'react';
import Image from 'next/image';

export default function UserDashboard() {
  return (
    <div className="w-screen">
      <Image
        alt="Hi"
        src="/images/debug.png"
        layout="fill"
        objectFit="contain"
        quality={100}
      />
    </div>
  );
}
