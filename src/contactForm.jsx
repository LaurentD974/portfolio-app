import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * Composant `ContactForm` permettant d'envoyer un message via un formulaire de contact.
 */
function ContactForm() {
  /** @type {Object} State pour stocker les valeurs du formulaire */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  /** @type {string} Identifiant du modèle EmailJS */
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  /** @type {string} Identifiant du service EmailJS */
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  /** @type {string} Clé publique EmailJS */
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  /** @type {string} Message de statut pour afficher la confirmation ou les erreurs */
  const [statusMessage, setStatusMessage] = useState("");
  /** @type {React.RefObject} Référence du formulaire */
  const form = useRef();

  /**
   * Met à jour l'état du formulaire lors de la saisie de l'utilisateur.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Événement de changement.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Soumet le formulaire en envoyant les données à l'API et via EmailJS.
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ data: formData }));

    try {
      // Envoi des données au backend Strapi
      const response = await fetch("http://localhost:1337/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      // Envoi du formulaire via EmailJS
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );

      // Gestion du message de statut
      if (response.ok) {
        setStatusMessage("Message envoyé avec succès !");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Réinitialisation du formulaire
      } else {
        setStatusMessage("Erreur lors de l'envoi !");
      }
    } catch (error) {
      setStatusMessage("Une erreur est survenue !");
    }
  };

  return (
    <div className="contactme">
      <h2>Contactez-moi</h2>

      {/* Formulaire d'envoi */}
      <form onSubmit={handleSubmit} ref={form}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Objet"
          onChange={handleChange}
          value={formData.subject}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          value={formData.message}
          required
        ></textarea>
        <button type="submit">Envoyer</button>
      </form>

      {/* Affichage du message de statut */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default ContactForm;
