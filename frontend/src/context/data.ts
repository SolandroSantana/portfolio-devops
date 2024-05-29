export async function getTodo() {
    const response = await fetch('http://localhost:3000/todos', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    });
    const data = response.json();
    return data;
}

export async function authUser(values: { email: string, password: string }) {
    const authenticate = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
    
    const response = await authenticate.json()
    return response
}