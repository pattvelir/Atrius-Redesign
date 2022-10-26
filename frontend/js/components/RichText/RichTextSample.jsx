import React from "react";
import { bool, object } from "prop-types";

import ImageBlock from "../ImageBlock/ImageBlock.jsx";
import VideoBlock from "../VideoBlock/VideoBlock.jsx";

const propTypes = {
  embeds: bool,
  short: bool,
  videoEmbed1: object,
  imageEmbed1: object,
  imageEmbed2: object,
  imageEmbed3: object,
};

const defaultProps = {
  embeds: false,
  short: false,
};

const RichTextSample = (props) => {
  const {
    embeds,
    short,
    videoEmbed1,
    imageEmbed1,
    imageEmbed2,
    imageEmbed3,
  } = props;

  return (
    <>
      <h2>Heading 2</h2>
      <p>
        Nullam consequat at metus nec gravida. Sed dictum nisl sit amet lobortis
        ultricies. <strong>Strong is used to indicate strong importance</strong>{" "}
        Vivamus non venenatis enim, sed fringilla tellus. Suspendisse rutrum
        quam vitae leo tempus luctus. Etiam nec pulvinar dui,{" "}
        <em>This text has added emphasis</em> eget eleifend felis. Proin
        bibendum molestie dolor. Aenean dictum pharetra mauris, ultrices{" "}
        <a href="#/somewhere">This is a text link</a> pretium nunc imperdiet in.
        Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
      </p>
      <h3>Heading 3</h3>
      <ol>
        <li>This is a list item in an ordered list</li>
        <li>
          An ordered list is a list in which the sequence of items is important.
          An ordered list does not necessarily contain sequence characters.
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
      <p>
        Nullam consequat at metus nec gravida. Sed dictum nisl sit amet lobortis
        ultricies. Vivamus non venenatis enim, sed fringilla tellus. Suspendisse
        rutrum quam vitae leo tempus luctus. Etiam nec pulvinar dui, eget
        eleifend felis. Proin bibendum molestie dolor. Aenean dictum pharetra
        mauris, ultrices pretium nunc imperdiet in. Nulla in eros fringilla urna
        pulvinar sollicitudin sed sed tortor.
      </p>
      {!short && (
        <>
          <h4>Heading 4</h4>
          <ul>
            <li>This is a list item in an unordered list</li>
            <li>
              An unordered list is a list in which the sequence of items is not
              important. Sometimes, an unordered list is a bulleted list. And
              this is a long list item in an unordered list that can wrap onto a
              new line.
            </li>
            <li>
              Lists can be nested inside of each other
              <ul>
                <li>This is a nested list item</li>
                <li>This is another nested list item in an unordered list</li>
                <ul>
                  <li>Additional nesting. But three is kind of a crowd.</li>
                </ul>
              </ul>
            </li>
            <li>This is the last list item</li>
          </ul>

          <h5>Heading 5</h5>

          <p>
            The <u>u element</u> is text with an unarticulated, though
            explicitly rendered, non-textual annotation
          </p>

          <blockquote>
            This is a Rich Text blockquote element which is usually similar to
            the Pull Quote embed, but with just the quote.
          </blockquote>

          <h6>Heading 6 - not really used</h6>

          <table>
            <thead>
              <tr>
                <th>Table Heading 1</th>
                <th>Heading 2</th>
                <th>Column 3</th>
                <th>Fourth Item</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sunt hydraes transferre alter</td>
                <td>Mare. A falsis. </td>
                <td>Aususs peregrination.</td>
                <td>Mensas favere in cubiculum</td>
              </tr>
              <tr>
                <td>Lixa grandis cacula est.</td>
                <td>Nunquam consumere cedrium.</td>
                <td>Guttuss favere.</td>
                <td>Est ferox fiscina, cesaris.</td>
              </tr>
              <tr>
                <td>Ubi est barbatus brabeuta.</td>
                <td>Cur xiphias credere.</td>
                <td>Stellas velum.</td>
                <td>Ubi est regius sectam.</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Table Footer Spanning four columns</td>
              </tr>
            </tfoot>
            <caption>Table Caption goes here.</caption>
          </table>

          <h4>More Edge Case Styles</h4>

          <p>
            <del>This text is deleted</del> and <ins>This text is inserted</ins>
          </p>

          <p>
            <s>This text has a strikethrough</s>
          </p>

          <p>
            Superscript<sup>Â®</sup>
          </p>

          <p>
            Subscript for things like H<sub>2</sub>O
          </p>

          <p>
            <small>This small text is small for for fine print, etc.</small>
          </p>

          <p>
            Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
          </p>

          <p>
            Keybord input: <kbd>Cmd</kbd>
          </p>

          <p>
            <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">
              This text is a short inline quotation
            </q>
          </p>

          <p>
            <cite>This is a citation</cite>
          </p>
          <p>
            The <dfn>dfn element</dfn> indicates a definition.
          </p>

          <p>
            The <mark>mark element</mark> indicates a highlight
          </p>

          <p>
            <code>This is what inline code looks like.</code>
          </p>

          <p>
            <samp>This is sample output from a computer program</samp>
          </p>
        </>
      )}

      {embeds && (
        <>
          <h2>Embeds Shown Here</h2>
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <div className="rich-text__embed">
            <ImageBlock {...imageEmbed1} />
          </div>
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <div className="rich-text__embed l-pull-right">
            <VideoBlock {...videoEmbed1} />
          </div>
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
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <div className="rich-text__embed l-pull-right">
            <ImageBlock {...imageEmbed3} />
          </div>
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
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <div className="rich-text__embed l-pull-left">
            <ImageBlock {...imageEmbed2} />
          </div>
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
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
          <div className="rich-text__embed">
            <VideoBlock {...videoEmbed1} />
          </div>
          <p>
            Nullam consequat at metus nec gravida. Sed dictum nisl sit amet
            lobortis ultricies. Vivamus non venenatis enim, sed fringilla
            tellus. Suspendisse rutrum quam vitae leo tempus luctus. Etiam nec
            pulvinar dui, eget eleifend felis. Proin bibendum molestie dolor.
            Aenean dictum pharetra mauris, ultrices pretium nunc imperdiet in.
            Nulla in eros fringilla urna pulvinar sollicitudin sed sed tortor.
          </p>
        </>
      )}
    </>
  );
};
RichTextSample.propTypes = propTypes;
RichTextSample.defaultProps = defaultProps;
export default RichTextSample;
