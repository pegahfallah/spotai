import {headers} from 'next/headers'

export default async function apiFromServer() {
    const resp = await fetch('http://localhost:3000/api/whoAmI', {
        method: 'GET', 
        headers: headers(),
    }).then((res) => res.json())

return (
    <div>API route from server {resp?.name}</div>
)
}
