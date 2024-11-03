import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  // ajout du stockage des données du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    message: ''
  });

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      // Vérification si tous les champs sont bien remplis
      if (!formData.nom || !formData.prenom || !formData.email || !formData.message) {
        setSending(false); // Réinitialise l'état d'envoi
        onError(); // Appelle la fonction d'erreur si des champs sont manquants
        return; // Sort de la fonction si un champ est manquant
      }

      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        // after API success
        onSuccess();
        evt.target.reset(); // reset the form
        setFormData({ nom: '', prenom: '', type: '', email: '', message: '' }); // Réinitialise les données du formulaire
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, formData]
  );

  // Fonction pour mettre à jour les valeurs des champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Met à jour le champ spécifique du formulaire
    });
  };

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom *" name="nom" onChange={handleChange} aria-label="Nom *"/>
          <Field placeholder="" label="Prénom *" name="prenom" onChange={handleChange}/>
          <Select
            selection={["Personel", "Entreprise"]}
            // onChange={handleChange}
            onChange={() => null}
            name="type"
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email *" name="email" onChange={handleChange}/>
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message *"
            name="message"
            type={FIELD_TYPES.TEXTAREA}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
