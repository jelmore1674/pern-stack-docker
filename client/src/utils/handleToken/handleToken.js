export const handleToken = async(token) => {
    try {
        const res = await fetch('http://localhost:3004/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const data = await res.json();
        if (data && data.id) {
            const resp = await fetch(
                `http://localhost:3004/profile/${data.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            console.log(resp);
            const user = await resp.json();
            return user;
        }
    } catch (err) {
        console.log('error');
    }
};