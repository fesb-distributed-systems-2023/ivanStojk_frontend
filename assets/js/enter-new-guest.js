// JavaScript file that implement logic for write-new-guest.html

import { GuestAPI } from "/assets/js/guestAPI.js"

window.onload = (e) => {
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    document.getElementById('clear-all-fields-button')?.addEventListener('click', OnClearButtonClick);
    document.getElementById('send-guest-button')?.addEventListener('click', OnCreateGuestButonClick);
}

function OnClearButtonClick() {
    document.getElementById('hotelId').value = '';
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('roomnumber').value = '';
}

async function OnCreateGuestButonClick() {
    let guest = {};

    const hotelId = document.getElementById('hotelId');
    if(!hotelId) {
        alert('HotelId field is empty!')
        return;
    }
    guest.hotelId = hotelId.value;

    const firstname = document.getElementById('firstname');
    if(!firstname) {
        alert('FirstName field is empty!')
        return;
    }

    guest.firstname = firstname.value.split(';');

    const lastname = document.getElementById('lastname');
    if(!lastname) {
        alert('LastName field is empty!')
        return;
    }
    guest.firstname = firstname.value;

    
    const roomnumber = document.getElementById('roomnumber');
    if(!roomnumber) {
        alert('RoomNumber field is empty!')
        return;
    }
    guest.roomnumber = roomnumber.value;
    
    const success = await GuestAPI.CreateNewGuest(guest);
    if(success) {
        alert('Guest successfully created')
        OnClearButtonClick();
    }
    
}