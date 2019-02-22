

const wrapper = (api, endpoint) => {
  return {
    get: () => api.get(endpoint),
    post: (doc) => api.post(endpoint).set('Authorization', 'Bearer testitesti').send(doc),
    delete: (id) => api.delete(`${endpoint}/${id}`).set('Authorization', 'Bearer testitesti'),
    put: (doc) => api.put(`${endpoint}`).send(doc),
    rootEndpoint: endpoint
  }
}

module.exports = wrapper