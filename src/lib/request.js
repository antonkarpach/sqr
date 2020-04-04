let onerror = id => window.location.replace('/error' + id);
let request = (path, body) => {
  return fetch(path, body && {method: 'POST', body})
    .then(res => res.json())
    .then(res => {
      if (!res.error) return res;
      else throw res.error.id;
    })
    .then(res => {
      if(res.socket) window.socket.emit(res.socket.event, res.socket.params);
      return res;
    })
};

export { onerror, request };