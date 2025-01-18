let currentStep = 1;

        // Step navigation logic
        function navigate(direction) {
            if (direction === 'next') {
                currentStep++;
            } else if (direction === 'prev') {
                currentStep--;
            }
            updateStepVisibility();
        }

        function updateStepVisibility() {
            // Hide all steps
            $('.form-step').addClass('d-none');

            // Show the current step
            $('#step' + currentStep).removeClass('d-none');

            // Enable/Disable buttons based on step
            if (currentStep === 1) {
                $('#prevButton').prop('disabled', true);
                $('#nextButton').prop('disabled', false);
            } else if (currentStep === 3) {
                $('#nextButton').prop('disabled', true);
                $('#submitButton').prop('disabled', false);
            } else {
                $('#prevButton').prop('disabled', false);
                $('#nextButton').prop('disabled', false);
            }
        }

        // Initialize date pickers for pickup and drop-off dates
        $(document).ready(function() {
            $('.datepicker').datepicker({
                format: 'mm/dd/yyyy',
                startDate: 'today',
                autoclose: true
            });

            // Listen to changes in the pickup and dropoff locations
            $('#pickupLocation, #dropoffLocation').change(function() {
                calculatePrice();
            });

            $('#km').change(function() {
                calculatePrice();
            });

            $('#paymentMode').change(function() {
                togglePaymentFields();
            });

            // Submit event handling
            $('#rentalForm').on('submit', function(event) {
                event.preventDefault(); // Prevent the form from submitting traditionally

                // Simulate a successful submission
                showFeedback(); // Display success message
                resetForm(); // Reset the form
            });

            updateStepVisibility(); // Initialize step visibility
        });

        // Distance between cities (in km)
        const cityDistances = {
            "Pretoria": {
                "Johannesburg": 60,
                "Durban": 600,
                "Cape Town": 1400
            },
            "Johannesburg": {
                "Pretoria": 60,
                "Durban": 570,
                "Cape Town": 1300
            },
            "Durban": {
                "Pretoria": 600,
                "Johannesburg": 570,
                "Cape Town": 1600
            },
            "Cape Town": {
                "Pretoria": 1400,
                "Johannesburg": 1300,
                "Durban": 1600
            }
        };

        // Calculate price based on selected locations and km
        function calculatePrice() {
            const pickup = $('#pickupLocation').val();
            const dropoff = $('#dropoffLocation').val();

            if (pickup === dropoff) {
                alert('Pickup and drop-off locations must be different.');
                return;
            }

            if (pickup && dropoff) {
                const distance = cityDistances[pickup] && cityDistances[pickup][dropoff];
                if (distance) {
                    $('#km').val(distance); // Automatically set the km based on distance
                    const pricePerKm = 2; // Price per kilometer
                    const totalPrice = distance * pricePerKm;
                    $('#price').val('$' + totalPrice.toFixed(2));
                    $('#submitButton').prop('disabled', false); // Enable the submit button
                }
            }
        }

        // Toggle payment fields based on selected payment mode
        function togglePaymentFields() {
            const paymentMode = $('#paymentMode').val();
            if (paymentMode === 'cash') {
                $('#cashDetails').removeClass('d-none');
                $('#cardDetails').addClass('d-none');
            } else if (paymentMode === 'card') {
                $('#cashDetails').addClass('d-none');
                $('#cardDetails').removeClass('d-none');
            }
        }

        // Show feedback after form submission
        function showFeedback() {
            const feedback = $('#feedback');
            feedback.removeClass('d-none').addClass('show'); // Ensure it's visible
            setTimeout(function () {
                feedback.removeClass('show').addClass('d-none'); // Hide it after 5 seconds
            }, 5000);
        }


        // Reset the form after submission
        function resetForm() {
            $('#rentalForm')[0].reset();
            $('#price').val('');
            $('#paymentMode').val('');
            $('#km').val('');
            $('#feedback').addClass('d-none');
            currentStep = 1;
            updateStepVisibility();
        }