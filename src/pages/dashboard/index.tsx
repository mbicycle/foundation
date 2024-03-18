import { memo } from 'react';
import Header from 'components/Header';

import useGuestTokenStore from 'stores/guestToken';

import CONFIG from 'utils/envConfig';

function Dashboard() {
  const { guestToken } = useGuestTokenStore();

  const searchParams = new URLSearchParams();
  if (guestToken) searchParams.set('guestToken', guestToken);

  const cvgenUrl = `${CONFIG.cvGenUrl}?${searchParams.toString()}`;
  const timeUrl = `${CONFIG.timeTrackerUrl}?${searchParams.toString()}`;

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] text-slate-300">
      <Header />
      <p className="text-3xl text-center py-6"> MBicycle Foundation</p>
      <ul className="flex mb-10 gap-10 p-10">
        <a
          href={cvgenUrl}
          className="border aspect-square border-slate-500 w-[15rem] flex justify-center items-center rounded-md
           hover:bg-slate-700"
        >
          CV Gen
        </a>
        <a
          href={timeUrl}
          className="border aspect-square border-slate-500 w-[15rem] flex justify-center items-center rounded-md
           hover:bg-slate-700"
        >
          CV Time Tracker
        </a>
      </ul>
    </div>
  );
}

export default memo(Dashboard);
