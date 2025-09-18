document.querySelectorAll(".btn-book-now").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const plan = this.getAttribute("data-plan");
        const service = this.getAttribute("data-service");
        const price = this.getAttribute("data-price");

        Swal.fire({
            title: `Book ${plan}`,
            html: `
                <form id="popupBookingForm" class="appointment-form">
                    <input type="hidden" name="selected_plan" value="${plan}">
                    <input type="hidden" name="price" value="${price}">

                    <div class="form-group" style="text-align:left">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="form-group" style="text-align:left">
                        <label for="phone">Phone</label>
                        <input type="tel" class="form-control" name="phone" required>
                    </div>
                    <p><strong>Selected Plan:</strong> ${plan} <br><strong>Price:</strong> ${price}</p>
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

                return fetch("https://formspree.io/f/xrbarajj", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
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