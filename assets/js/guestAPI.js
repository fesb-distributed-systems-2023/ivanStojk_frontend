const Base_URL = 'http://localhost:5149'

class _GuestAPI { 

    async GetAllGuest() {
        const URL = `${Base_URL}/guest/all`;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(!response.ok) {
            console.error('Could not get guests from the API!')
            return null;
        }

        return response.json();
    }

    // Returns true if successful and false if failed
    async CreateNewGuest(guest) {
        const URL = `${Base_URL}/guest/all`;
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guest)
        });

        if(!response.ok) {
            console.error('Could not create new guest.')
            if(response.status === 400) { /* Bad Request */
                alert(await response.text())
            }
            return false;
        }

        return true;
    }

    async DeleteGuest(guestId) {
        const URL = `${Base_URL}/guest/${guestId}`;
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(!response.ok) {
            console.error(`Could not delete guest with id = ${guestId}.`)
            if(response.status === 400) { /* Bad Request */
                alert(await response.text())
            }
        }
    }

}

export const GuestAPI = new _GuestAPI();