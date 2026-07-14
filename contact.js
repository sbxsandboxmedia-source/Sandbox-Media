(() => {
  const form = document.getElementById("contactProjectForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const data = new FormData(form);
      const services = [...form.querySelectorAll('input[name="service"]:checked')].map(input => input.value);

      const lines = [
        "Hello Sandbox Media,",
        "",
        "I would like to discuss a project.",
        "",
        `Name: ${data.get("name") || "-"}`,
        `Email: ${data.get("email") || "-"}`,
        `Phone / WhatsApp: ${data.get("phone") || "-"}`,
        `Business / Brand: ${data.get("business") || "-"}`,
        `Services: ${services.length ? services.join(", ") : "Not selected"}`,
        `Budget: ${data.get("budget") || "-"}`,
        `Timeline: ${data.get("timeline") || "-"}`,
        "",
        "Project Details:",
        `${data.get("message") || "-"}`,
        "",
        "Sent from Sandbox Media contact page."
      ];

      const whatsappNumber = "919000000000";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
      const opened = window.open(url, "_blank", "noopener");
      sessionStorage.setItem("sandboxInquiryPrepared", "true");
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, opened ? 650 : 0);
    });
  }

  document.querySelectorAll(".contact-faq .faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".contact-faq .faq-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector("button")?.setAttribute("aria-expanded", "false");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = "0px";
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
})();