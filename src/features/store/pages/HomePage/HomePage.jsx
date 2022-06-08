import React from 'react';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './homepage.scss';

export default function HomePage() {
  return (
    <div className="homePageWrapper">
      <TitleAdminStorePage title="Store Dashboard" style={{ marginBottom: '2rem' }} />
    </div>
  );
}
