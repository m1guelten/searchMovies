async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}
getData('https://jsonplaceholder.typicode.com/posts')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}
postData('https://jsonplaceholder.typicode.com/posts', {
  title: 'Hello world!!!',
  body: 'Подробное описание',
  description: 'Додатковий заголовок',
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

async function putData(url, data) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}
putData('https://jsonplaceholder.typicode.com/posts/9', {
  title: 'Hello world!!!',
  body: 'Подробное описание',
  description: 'Додатковий заголовок',
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

async function patchData(url, data) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw Error(response.status);
  return response.json();
}
patchData('https://jsonplaceholder.typicode.com/posts/9', {
  title: 'Hello student!!!',
  userId: 99,
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

async function deleteData(url) {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) throw Error(response.status);
  return response.json();
}
deleteData('https://jsonplaceholder.typicode.com/posts/9')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
