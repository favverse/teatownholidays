module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    name: 'Tea Town Holidays',
    location: 'Meppadi, Wayanad, Kerala',
    bedrooms: 2,
    bathrooms: 2,
    airbnbUrl:
      'https://www.airbnb.co.in/rooms/1605539872474002137?source_impression_id=p3_1779211599_P3g6XHaKF_uDuPSZ',
    amenities: ['Mountain View', 'Free Parking', 'Smoking Allowed', 'Security Cameras'],
  });
};
