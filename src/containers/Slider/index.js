import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date"; 
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1  Du plus ancien au plus récent
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // Du plus récent au plus ancien
  );

  const nextCard = () => {
    if (byDateDesc) { // vérification que byDateDesc est défini (évite erreur console "byDateDesc undefined")
      setTimeout(
        // () => setIndex(index < byDateDesc.length ? index + 1 : 0), 
        // Affiche 4 slides dont un blanc (state 3) car pas d'index 3 dans byDateDesc
        // donc length - 1 pour n'afficher que les trois éléments de byDateDesc
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title} // Fragment remplacé par une div. Key dans cette div pour que chaque
          // événement mapé (cf. ligne 31) ait sa propre clé.
          // Résolution d'une erreur console
        >
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div> {/* affichage du mois fautif : getMonth */}
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input 
                  key={`${_.title}`} // Remplace key={`${event.id}`} pour correspondre à la slide 
                  // en cours (cf. ligne 53). Résolution d'une erreur console.
                  type="radio"
                  name="radio-button"
                  // checked={idx === radioIdx} (selection des boutons radio non fonctionnelle)
                  checked={index === radioIdx} // index est actualisé selon le state pour selectionner
                  // le bouton radio correspondant à la slide affichée
                  readOnly // choix du readOnly (bouton radio non selectionable) plutôt que onChange
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
