// JavaScript file that implement logic for list-all-guest.html

import { GuestAPI } from "/assets/js/guestAPI.js"

window.onload = (e) => {
    document.getElementById('get-all-guest-button')?.addEventListener('click', LoadTable);
    document.getElementById('clear-all-guest-button')?.addEventListener('click', ClearTable);
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    ClearTable();
}

async function LoadTable() {
    const guests = await GuestAPI.GetAllGuest();
    if(!guest) {
        console.error('Could not load guests.')
        return;
    }

    const table = document.getElementById('guest-table');
    if(!table) {
        console.error('Could not find guest table.')
        return;
    }

    // Construct table rows for guest data

    /*
        The idea is to get the guests from the backend as JSON:
        [
            {
                "id": 1,
                "hotelId": "Panorama",
                "firstame": "Ivan",
                "lastname": "Stojković",
                "roomnumber": "11",
                "timestamp": "13.2.2023 13:30:33"
            },
            {
                "id": 2,
                "hotelId": "Panorama",
                "firstame": "Ivan",
                "lastname": "Ivanić",
                "roomnumber": "12",
                "timestamp": "13.2.2023 13:45:54"
            }
        ]

        And manually create and insert HTML for that data into <table> tag:

        <thead>
            <tr>
                <th>ID</th>
                <th>HotelId</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>RoomNumber</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Panorama</td>
                <td>Ivan</td>
                <td>Stojković</td>
                <td>11</td>
                <td>13.2.2023 13:30:33</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Panorama</td>
                <td>Ivan</td>
                <td>Stojković</td>
                <td>12</td>
                <td>13.2.2023 13:45:54</td>
            </tr>  
        </tbody>

    */

    ClearTable();

    let table_body = table.getElementsByTagName('tbody')?.[0];
    if(!table_body) {
        console.error('Could not find <tbody> in guest table!');
        return;
    }

    // Add each row manually
    guests.forEach(e => {
        const row = document.createElement('tr');
        row.addEventListener('dblclick', () => { DeleteGuest(e.id) });

        const lstRoomnumbers = e.roomnumber.join('<br>')

        row.innerHTML = `
                <td>${e.id}</td>
                <td>${e.hotelId}</td>
                <td>${e.firstname}</td>
                <td>${e.lastname}</td>
                <td>${lstRoomnumbers}</td>
                <td>${e.timestamp}</td>
        `
        table_body.appendChild(row)
    });

}

function ClearTable() {
    const table = document.getElementById('guest-table');
    if(!table) {
        console.error('Could not find guest table.')
        return;
    }
    table.innerHTML = `
    <thead>
        <tr>
            <th>ID</th>
            <th>HotelId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>RoomNumber</th>
            <th>Timestamp</th>
            </tr>
    </thead>
    <tbody>

    </tbody>
    `;
}

export function DeleteGuest(guestId) {
    alert(`Deleting guest with ID = ${guestId}`);
    GuestAPI.DeleteGuest(guestId);
    ClearTable();
    LoadTable(); // Reload table
}