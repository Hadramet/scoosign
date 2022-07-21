export default async function fetchJson(input, init) {

    const res = await fetch(input, init)

    const data = await res.json()
    
    if (res.ok) return data

    const error = new Error('An error occurred while fetching the data.')

    error.info = data

    error.status = res.status
    
    throw error
}