

const wrapper = (a, b) => {
  return {
    get: () => a.get(b),
    post: (doc) => a.post(b).set('Authorization', 'Bearer testitesti').send(doc),
    delete: (id) => a.delete(`${b}/${id}`).set('Authorization', 'Bearer testitesti'),
    put: (doc) => a.put(`${b}`).send(doc),
    rootEndpoint: b
  }
}

module.exports = wrapper