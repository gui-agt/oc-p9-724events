import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {

  it("calls the error action if a required field is missing", async () => {
    const onError = jest.fn();
    render(<Home onError={onError} />);

    // Remplir seulement certains champs obligatoires
    fireEvent.change(screen.getByTestId("testid-nom", { name: "Nom *" }), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("testid-email", { name: "Email *" }), { target: { value: "john.doe@example.com" } });

    // Soumettre le formulaire
    fireEvent.click(await screen.findByText("Envoyer"));
  });
  
  it("calls the success action if all required fields are filled", async () => {
    const onSuccess = jest.fn();
    render(<Home onSuccess={onSuccess} />);

    // Remplir tous les champs obligatoires
    fireEvent.change(screen.getByTestId("testid-nom", { name: "Nom *" }), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("testid-prenom", { name: "Prénom *" }), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("testid-email", { name: "Email *" }), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByTestId("testid-message", { name: "Message *" }), { target: { value: "Ceci est un message test" } });

    const submitButton = await screen.findByTestId("submit-button-test-id");
    fireEvent.click(submitButton);

    await screen.findByText("En cours");
    await screen.findByText("Envoyer");
  });

});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
