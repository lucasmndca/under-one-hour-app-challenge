app.factory('mainFactory', () => {

    const host = 'http://localhost:8080'

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    const findAll = async () => {
        try {
            const res = await fetch(`${host}/todos`, {
                method: 'GET',
                headers
            })
            return res.json()
        } catch (error) {
            console.error('Could not fetch todos.')
        }
    }

    const create = async (todo) => {
        try {
            const res = await fetch(`${host}/todos/create`, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers
            })
            return res.json()
        } catch (error) {
            console.error('Could not create todo.')
        }
    }

    const remove = async (_id) => {
        try {
            const res = await fetch(`${host}/todos/remove?id=${_id}`, {
                method: 'DELETE',
                headers
            })
            return res.json()
        } catch (error) {
            console.error('Could not create todo.')
        }
    }

    return {
        findAll,
        create,
        remove  
    }
})