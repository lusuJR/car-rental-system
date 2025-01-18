document.getElementById('rentalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropoffLocation = document.getElementById('dropoffLocation').value;
    const carType = document.getElementById('carType').value;
    const days = parseInt(document.getElementById('days').value);
    const km = parseInt(document.getElementById('km').value);
    const pickupDate = document.getElementById('pickupDate').value;
    const dropoffDate = document.getElementById('dropoffDate').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const price = calculatePrice(carType, km, days);
    const paymentDetails = paymentMode === 'cash' ? getCashDetails() : paymentMode === 'card' ? getCardDetails() : null;

    // Form validation
    if (!pickupLocation || !dropoffLocation || !carType || isNaN(days) || isNaN(km) || !pickupDate || !dropoffDate || !paymentMode) {
        alert('Please fill all required fields');
        return;
    }

    // Feedback
    alert(`Car Rental Summary:
    Pickup Location: ${pickupLocation}
    Drop-off Location: ${dropoffLocation}
    Car Type: ${carType}
    Rental Duration: ${days} days
    Kilometers: ${km}
    Pickup Date: ${pickupDate}
    Drop-off Date: ${dropoffDate}
    Total Price: $${price}
    Payment Mode: ${paymentMode === 'cash' ? `Cash, Amount: $${paymentDetails}` : `Card Type: ${paymentDetails.cardType}, Card Number: ${paymentDetails.cardNumber}`}
    `);

    // Show feedback to user
    document.getElementById('feedback').classList.remove('d-none');
});

document.getElementById('paymentMode').addEventListener('change', function(event) {
    const paymentMode = event.target.value;
    const cashDetailsDiv = document.getElementById('cashDetails');
    const cardDetailsDiv = document.getElementById('cardDetails');
    
    if (paymentMode === 'cash') {
        cashDetailsDiv.classList.remove('d-none');
        cardDetailsDiv.classList.add('d-none');
    } else if (paymentMode === 'card') {
        cardDetailsDiv.classList.remove('d-none');
        cashDetailsDiv.classList.add('d-none');
    } else {
        cashDetailsDiv.classList.add('d-none');
        cardDetailsDiv.classList.add('d-none');
    }
});

function calculatePrice(carType, km, days) {
    let basePricePerDay = 0;
    let basePricePerKM = 0;

    // Set pricing based on car type
    switch (carType) {
        case 'sedan':
            basePricePerDay = 30;
            basePricePerKM = 0.15;
            break;
        case 'suv':
            basePricePerDay = 50;
            basePricePerKM = 0.25;
            break;
        case 'convertible':
            basePricePerDay = 70;
            basePricePerKM = 0.35;
            break;
    }

    // Calculate total price
    const price = (basePricePerDay * days) + (basePricePerKM * km);
    return price.toFixed(2);
}

function getCashDetails() {
    const cashAmount = document.getElementById('cashAmount').value;
    return cashAmount;
}

function getCardDetails() {
    const cardType = document.getElementById('cardType').value;
    const cardNumber = document.getElementById('cardNumber').value;
    return { cardType, cardNumber };
}

// Initialize the datepicker
$(document).ready(function() {
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: 'today',
    });
});
