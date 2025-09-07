document.querySelectorAll(".btn-book-now").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        const plan = this.getAttribute("data-plan");

        Swal.fire({
            title: `Book ${plan} Package`,
            html: `
                <form id="popupBookingForm" class="appointment-form">
                    <input type="hidden" name="selected_plan" value="${plan}">
                    
                    <div class="form-group" style="text-align:left">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="form-group" style="text-align:left">
                        <label for="phone">Phone</label>
                        <input type="tel" class="form-control" name="phone" required>
                    </div>
                    <div class="form-group" style="text-align:left">
                        <label for="service">Service</label>
                        <select name="service" class="form-control" required>
                            <option value="" disabled selected>Select service</option>
                            <option value="House Cleaning">House Cleaning</option>
                            <option value="Office Cleaning">Office Cleaning</option>
                            <option value="End of Tenancy Cleaning">End of Tenancy Cleaning</option>
                            <option value="Carpet & Upholstery Cleaning">Carpet & Upholstery Cleaning</option>
                            <option value="Deep Cleaning">Deep Cleaning</option>
                            <option value="Window Cleaning">Window Cleaning</option>
                            <option value="Commercial Cleaning">Commercial Cleaning</option>
                        </select>
                    </div>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit Booking',
            focusConfirm: false,
            preConfirm: () => {
                const form = document.getElementById("popupBookingForm");
                if (!form.checkValidity()) {
                    Swal.showValidationMessage("⚠️ Please fill all fields");
                    return false;
                }
                const formData = new FormData(form);

                // Send data to Formspree
                return fetch("https://formspree.io/f/xrbarajj", {
                    method: "POST",
                    body: formData,
                    headers: {'Accept': 'application/json'}
                }).then(response => {
                    if (!response.ok) {
                        throw new Error("Form submission failed");
                    }
                    return response.json();
                }).catch(error => {
                    Swal.showValidationMessage(`❌ ${error.message}`);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '✅ Success!',
                    'Your booking request has been sent.',
                    'success'
                );
            }
        });
    });
});

