import axios from 'axios'
const fetcher = async (url) => (await axios.get(url)).data

export default fetcher
