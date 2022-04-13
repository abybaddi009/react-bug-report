var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export function fetchUserLocation(details) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const {
          latitude,
          longitude,
          altitude,
          accuracy,
          altitudeAccuracy,
          heading,
          speed,
        } = pos.coords;
        resolve({
          data: {
            latitude,
            longitude,
            altitude,
            accuracy,
            altitudeAccuracy,
            heading,
            speed,
          },
        });
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        reject(err);
      },
      options
    );
  });
}
