export const getUserLocation = async (): Promise<[number, number]> => {
   return new Promise((resolve, reject) => {
      /* this is coming from the browser same with the function getCurrentPosition,
      if we want to get the user in motion it has to be watch */
      navigator.geolocation.getCurrentPosition(
         ({ coords }) => {
            resolve([coords.longitude, coords.latitude]);
         },
         (err) => {
            alert('Geolocation could not be retrieved');
            console.log(err);
            reject();
         },
      );
   });
};
