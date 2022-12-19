export { fetchJSON };

async function fetchJSON(what) {

    return fetch(`./json/${what}.json`).then(res => res.json());

}
