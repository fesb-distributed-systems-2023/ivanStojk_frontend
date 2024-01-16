// JavaScript file that implement logic for write-new-guest.html

import { GuestAPI } from "/assets/js/guestAPI.js"

window.onload = (e) => {
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    document.getElementById('clear-all-fields-button')?.addEventListener('click', OnClearButtonClick);
    document.getElementById('create-guest-button')?.addEventListener('click', OnCreateGuestButonClick);
}

function OnClearButtonClick() {
    document.getElementById('hotelId').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('roomNumber').value = '';
}

async function OnCreateGuestButonClick() {
    let guest = {};

    const hotelId = document.getElementById('hotelId');
    if(!hotelId) {
        alert('HotelId field is empty!')
        return;
    }
    guest.hotelId = hotelId.value;

    const firstname = document.getElementById('firstName');
    if(!firstname) {
        alert('FirstName field is empty!')
        return;
    }

    

    const lastname = document.getElementById('lastName');
    if(!lastname) {
        alert('LastName field is empty!')
        return;
    }
    guest.firstname = firstname.value;

    
    const roomnumber = document.getElementById('roomNumber');
    if(!roomnumber) {
        alert('RoomNumber field is empty!')
        return;
    }
    guest.roomNumber = roomNumber.value;
    
    const success = await GuestAPI.CreateNewGuest(guest);
    if(success) {
        alert('Guest successfully created')
        OnClearButtonClick();
    }
    
}