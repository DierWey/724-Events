import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback( // Uniquement si les dépendances (onSuccess et onError) changent
    async (evt) => {
      evt.preventDefault();
      setSending(true); // L'envoi du formulaire est en cours
      // We try to call mockContactApi (Fausse API de contact)
      try {
        await mockContactApi(); // Await permet d'attendre que la fonction se termine
        setSending(false); // L'envoi du formulaire est terminé
        onSuccess(); // Indique que l'envoi est bien passé (utile pour le message de confirmation d'envoi).
      } catch (err) { // si il y a une erreur lors de l'envoi
        setSending(false); // L'envoi du formulaire est terminé
        onError(err); // Indique qu'il y a eut une erreur lors de l'envoi
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
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
