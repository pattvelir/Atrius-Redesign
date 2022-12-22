import React from "react";
import AccordionContainer from "./AccordionContainer/AccordionContainer.jsx";
import AccordionItem from "./AccordionItem/AccordionItem.jsx";

export default {
  title: "Components/Accordion",
  component: AccordionContainer,
};

export const Default = () => {
  return (
    <AccordionContainer>
      <AccordionItem title="Vaporware">
        <p>
          Tousled bespoke biodiesel ascot adaptogen irony. Cronut wayfarers
          semiotics locavore lumbersexual taxidermy adaptogen austin
          dreamcatcher pinterest. Swag mustache hammock, jean shorts affogato
          occupy cred lomo vinyl. Deep v gochujang cold-pressed artisan.
          Sartorial listicle you probably haven't heard of them chicharrones,
          asymmetrical kogi affogato thundercats PBR&B irony gastropub keffiyeh
          shoreditch ethical.
        </p>
      </AccordionItem>
      <AccordionItem title="tattooed trust fund" type="h4">
        <p>
          Cloud bread vaporware pickled prism, live-edge biodiesel williamsburg
          blue bottle small batch PBR&B single-origin coffee. Vice lyft kitsch
          crucifix tacos pinterest. Marfa jean shorts kale chips, chia kombucha
          bruh schlitz activated charcoal. Bushwick pour-over fashion axe ascot
          prism pitchfork everyday carry sustainable kale chips farm-to-table.
          Photo booth kogi bruh sus hexagon godard glossier tilde. Copper mug
          sustainable mukbang, XOXO man braid before they sold out ethical
          drinking vinegar.
        </p>

        <p>
          Photo booth meh 3 wolf moon shaman. Mustache bicycle rights waistcoat,
          gatekeep tousled copper mug cardigan ramps before they sold out viral
          big mood DSA +1 freegan. La croix tacos polaroid four loko, fit
          coloring book organic. Migas cray squid palo santo shaman ugh
          knausgaard meggings pitchfork organic authentic venmo mixtape godard.
          Aesthetic chillwave authentic, pug taiyaki 3 wolf moon shaman
          gastropub try-hard four loko. Tousled af trust fund taxidermy fashion
          axe deep v craft beer DIY tofu tacos tonx vice green juice PBR&B jean
          shorts.
        </p>
      </AccordionItem>
    </AccordionContainer>
  );
};

export const h4Title = () => (
  <AccordionContainer>
    <AccordionItem title="Air plant authentic" type="h4">
      <p>
        Four dollar toast man braid church-key blog tbh williamsburg tonx,
        wayfarers typewriter everyday carry gluten-free green juice cronut woke.
        Vibecession retro swag raclette, fashion axe vice jianbing disrupt
        thundercats. 3 wolf moon ennui cliche pabst, poke bodega boys
        thundercats direct trade. Art party chartreuse bruh shabby chic
        shoreditch schlitz. Locavore deep v photo booth, skateboard organic cray
        schlitz hexagon gastropub cardigan unicorn semiotics tofu disrupt tacos.
        Distillery af banjo mumblecore biodiesel poke locavore pitchfork vinyl
        raw denim gochujang tumblr narwhal.
      </p>
    </AccordionItem>
  </AccordionContainer>
);

export const h2Title = () => (
  <AccordionContainer>
    <AccordionItem title="mixtape 3 wolf moon">
      <p>
        Four dollar toast man braid church-key blog tbh williamsburg tonx,
        wayfarers typewriter everyday carry gluten-free green juice cronut woke.
        Vibecession retro swag raclette, fashion axe vice jianbing disrupt
        thundercats. 3 wolf moon ennui cliche pabst, poke bodega boys
        thundercats direct trade. Art party chartreuse bruh shabby chic
        shoreditch schlitz. Locavore deep v photo booth, skateboard organic cray
        schlitz hexagon gastropub cardigan unicorn semiotics tofu disrupt tacos.
        Distillery af banjo mumblecore biodiesel poke locavore pitchfork vinyl
        raw denim gochujang tumblr narwhal.
      </p>
    </AccordionItem>
  </AccordionContainer>
);

export const footer = () => (
  <div style={{ backgroundColor: "#000" }} className="global-footer">
    <AccordionContainer section="footer">
      <AccordionItem title="mixtape 3 wolf moon">
        <ul className="footer-nav__col">
          <li>
            <a href="#">Test</a>
          </li>
          <li>
            <a href="#">Test</a>
          </li>
          <li>
            <a href="#">Test</a>
          </li>
          <li>
            <a href="#">Test</a>
          </li>
          <li>
            <a href="#">Test</a>
          </li>
          <li>
            <a href="#">Test</a>
          </li>
        </ul>
      </AccordionItem>
    </AccordionContainer>
  </div>
);
