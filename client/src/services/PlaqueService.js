const baseURL = 'http://localhost:3000/api/plaques/'


export default {
  getLocations(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  // used to get further api info
  postLocations(payload){
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
  },
  updateLocation(id, location) {
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(location),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(res => res.json())
  }
}
