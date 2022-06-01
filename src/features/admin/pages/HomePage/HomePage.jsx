import React from 'react';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './homePage.scss';

export default function HomePage() {
  return (
    <div className="homePageWrapper">
      <TitleAdminStorePage title="Dashboard" />
      <p>This page placed for diagrams, chart to summarise the systems</p>
    </div>
  );
}
