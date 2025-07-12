// js/auth.js
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        password
      });

      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Signup failed";
      alert(msg);
    }
  });
}
