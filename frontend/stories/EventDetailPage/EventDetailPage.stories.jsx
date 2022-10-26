import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";
import mockData from "./mockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";
import Container7030 from "../../js/components/Container/Container7030.jsx";

import Breadcrumbs from "../../js/components/Breadcrumbs/Breadcrumbs.jsx";
import PageHeader from "../../js/components/PageHeader/PageHeader.jsx";
import EventCard from "../../js/components/EventCard/EventCard.jsx";
import EventLocation from "../../js/components/EventLocation/EventLocation.jsx";
import RichText from "../../js/components/RichText/RichText.jsx";

export default {
  title: "Pages/Event Detail Page",
};

export const eventDetailPage = () => (
  <FullTemplate>
    <ContainerFull>
      <Breadcrumbs {...mockData.breadcrumbs} />
      <PageHeader {...mockData.pageTitle} />
    </ContainerFull>
    <Container7030
      left={
        <RichText>
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <ol>
            <li>This is a list item in an ordered list</li>
            <li>
              An ordered list is a list in which the sequence of items is
              important. An ordered list does not necessarily contain sequence
              characters.
            </li>
            <li>
              Lists can be nested inside of each other
              <ol>
                <li>This is a nested list item</li>
                <li>This is another nested list item in an ordered list</li>
                <ol>
                  <li>Additional nesting. But three is kind of a crowd.</li>
                </ol>
              </ol>
            </li>
            <li>This is the last list item</li>
          </ol>
          <h3>Clemens urbs solite imperiums ionicis tormento est.</h3>
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
        </RichText>
      }
      right={<EventCard {...mockData.event} />}
    />
    <ContainerFull>
      <EventLocation {...mockData.mapEmbed} />
    </ContainerFull>
  </FullTemplate>
);
