export const SINGAPORE_HOLIDAYS = [
  {
    name: 'New Year\'s Day',
    date: '2026-01-01',
    season: 'newyear',
    greeting: 'Happy New Year! Starting fresh in the Lion City.',
    culturalHighlight: 'Marina Bay Fireworks Countdown & civic district illuminations.',
    longWeekend: false,
  },
  {
    name: 'Chinese New Year',
    date: '2026-02-17',
    season: 'cny',
    greeting: 'Gong Xi Fa Cai! May the Year of the Horse bring prosperity & joy.',
    culturalHighlight: 'Chinatown festive street light-up, River Hongbao & festive markets.',
    longWeekend: true,
  },
  {
    name: 'Hari Raya Puasa',
    date: '2026-03-21',
    season: 'hariraya',
    greeting: 'Selamat Hari Raya Aidilfitri! Peace, joy and forgiveness.',
    culturalHighlight: 'Geylang Serai Ramadan Bazaar & Kampong Glam cultural light-up.',
    longWeekend: true,
  },
  {
    name: 'Good Friday',
    date: '2026-04-03',
    season: 'easter',
    greeting: 'Peaceful Good Friday long weekend in Singapore.',
    culturalHighlight: 'Cathedral of the Good Shepherd & quiet city retreats.',
    longWeekend: true,
  },
  {
    name: 'Hari Raya Haji',
    date: '2026-05-27',
    season: 'harirayahaji',
    greeting: 'Selamat Hari Raya Haji! Commemorating faith and charity.',
    culturalHighlight: 'Sultan Mosque special prayers & community gatherings.',
    longWeekend: false,
  },
  {
    name: 'Vesak Day',
    date: '2026-05-31',
    season: 'vesak',
    greeting: 'Happy Vesak Day! Wishing enlightenment and tranquility.',
    culturalHighlight: 'Buddha Tooth Relic Temple ceremonies & lotus blessings.',
    longWeekend: true,
  },
  {
    name: 'National Day (SG)',
    date: '2026-08-09',
    season: 'nationalday',
    greeting: 'Majulah Singapura! Happy 61st Singapore National Day.',
    culturalHighlight: 'National Day Parade (NDP) at the Padang, state flypast & fireworks.',
    longWeekend: true,
  },
  {
    name: 'Deepavali',
    date: '2026-11-08',
    season: 'deepavali',
    greeting: 'Happy Deepavali! May the Divine Light illuminate your home with wisdom and happiness.',
    culturalHighlight: 'Little India Deepavali street light-up along Serangoon Road, Campbell Lane festive bazaar & peacock archways.',
    longWeekend: true,
  },
  {
    name: 'Christmas Day',
    date: '2026-12-25',
    season: 'christmas',
    greeting: 'Merry Christmas from sunny tropical Singapore!',
    culturalHighlight: 'Christmas on A Great Street along Orchard Road & Christmas Wonderland at Gardens by the Bay.',
    longWeekend: true,
  },
];

export default async function handler(req, res) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  const todayStr = `${now.getFullYear()}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

  const holidaysWithDays = SINGAPORE_HOLIDAYS.map((h) => {
    const hDate = new Date(h.date);
    const diffTime = hDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return {
      ...h,
      daysUntil: diffDays,
    };
  });

  let activeSeason = 'default';
  let isFestivePeriod = false;

  if (currentMonth === 10 || (currentMonth === 11 && currentDay <= 15)) {
    activeSeason = 'deepavali';
    isFestivePeriod = true;
  } else if (currentMonth === 12) {
    activeSeason = 'christmas';
    isFestivePeriod = true;
  } else if (currentMonth === 1 || currentMonth === 2) {
    activeSeason = 'cny';
    isFestivePeriod = true;
  } else if (currentMonth === 3 || currentMonth === 4) {
    activeSeason = 'hariraya';
    isFestivePeriod = true;
  } else if (currentMonth === 7 || currentMonth === 8) {
    activeSeason = 'nationalday';
    isFestivePeriod = true;
  }

  const upcomingHoliday = holidaysWithDays.find((h) => h.daysUntil >= 0) || holidaysWithDays[0];
  const activeHoliday = holidaysWithDays.find((h) => h.season === activeSeason) || upcomingHoliday;

  const weather = {
    city: 'Singapore',
    temperature: 30,
    feelsLike: 34,
    condition: 'Partly Cloudy with Afternoon Showers',
    precipitationChance: '45%',
    humidity: '78%',
    uvIndex: 'High (8)',
    stations: [
      { area: 'Marina Bay', temp: 30, condition: 'Fair' },
      { area: 'Orchard Road', temp: 31, condition: 'Partly Cloudy' },
      { area: 'Changi Airport', temp: 29, condition: 'Passing Shower' },
      { area: 'Jurong West', temp: 30, condition: 'Humid' },
    ],
    updatedAt: new Date().toLocaleTimeString('en-SG', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' }),
  };

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    weather,
    holidays: {
      today: todayStr,
      isFestivePeriod,
      activeSeason,
      currentHoliday: activeHoliday,
      allHolidays: holidaysWithDays,
    },
  });
}
