const baseURL = 'http://localhost:3000/api/plaques/'


export default {
  getLocations(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  postLocations(payload)
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },
  deleteLocations(id){
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  }
}
