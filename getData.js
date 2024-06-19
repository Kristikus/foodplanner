export function getData(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log('La requête a échoué');
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
}
