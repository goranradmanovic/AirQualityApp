const get = async (url) => {

  let response = await fetch(url);
  let data = await response.json();

  return data;
}

export default {
  getAPIData(url) {
    return get(url);
  }
}
