import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ); // Changement de l'opérateur pour classer du plus récent au plus ancien.

  // Fonction de changement slide
  const nextCard = () => {
    setIndex((prevIndex) => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0);
  };

  // Fonction automatisation du défilement des slides
  useEffect(() => {
    const timeout = setTimeout(nextCard, 5000);
    return () => clearTimeout(timeout); // Nettoyage pour éviter l'accumulation des timeouts
  }, [index, byDateDesc]);
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`${event.title}-${event.date}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((radioEvent, radioIdx) => (
                <input
                  key={`${event.title}-${event.date}-${radioEvent.title}`} // modification en clé unique, car event.id était undefined
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // modification de idx en index, comparaison index
                  readOnly
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
