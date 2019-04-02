const config = {
  'development': {
    baseURL: 'http://192.168.1.2:8080',
    fileBaseURL: 'http://192.168.1.2:7998'
  },
  'production': {
    baseURL: 'https://bookit.letec.top',
    fileBaseURL: 'https://bookit.letec.top'
  }
}

export default config[process.env.NODE_ENV];