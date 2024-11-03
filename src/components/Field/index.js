import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

// ajout de onChange dans les props
const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, onChange }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={onChange} // ajout de onChange
          data-testid={`testid-${name}`}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} onChange={onChange} data-testid="testid-message" />;
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={onChange} // ajout de la gestion de l'évènement onChange
          data-testid="testid-message"
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired, // ajout de la validation pour onChange
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
 }

export default Field;
