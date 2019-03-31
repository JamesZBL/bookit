const config = {
  'development': {
    baseURL: 'http://192.168.1.2:8080'
  },
  'production': {
    baseURL: 'http://bookit.letec.top'
  }
}

export default config[process.env.NODE_ENV];