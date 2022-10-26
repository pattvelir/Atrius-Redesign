/** @module common/components */

import * as R from "ramda";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * 
 * A generic pop-out container that is anchored to an element. Useful for drop-down functionality.
 * ```
   <Flyout
     anchorToEl={func.isRequired}
     doNotCloseOn={arrayOf<HtmlElement>}
     inFlow={bool}
     open={bool.isRequired}
     requestClose={func}
   >
     <children: node.isRequired>
   </Flyout>
 * ```
 * @extends React.Component 
 * @param {function} props.anchorToEl Function returning an HtmlElement for the dropdown to be anchored to.
 * @param {array} props.doNotCloseOn An array of HtmlElement that should NOT trigger the flyout to close when clicked
   @param {bool} props.inFlow Allow flyout to render as static in the document flow (not absolutely positioned)
   @param {bool} open Flag for setting the open state
   @param {function} requestClose Function called when the component itself asks to be closed

 */
class Flyout extends React.Component {
  constructor(props) {
    super(props);
    this.flyoutRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", (e) => this.handleClickOutside(e));
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", (e) =>
      this.handleClickOutside(e),
    );
  }

  handleClickOutside(event) {
    if (!this.props.open) {
      return;
    }

    const target = event.target;
    const flyoutRef = this.flyoutRef.current;
    const allRefs = this.props.doNotCloseOn.concat(flyoutRef);
    const isOutside = R.all(R.equals(false))(
      R.map((ref) => ref.contains(target), allRefs),
    );

    if (isOutside) {
      if (this.props.requestClose) {
        this.props.requestClose(this.props.id);
      }
    }
  }

  positionStyles() {
    if (this.props.inFlow) {
      return {};
    }

    const anchor = this.props.anchorToEl();
    const rect = anchor.getBoundingClientRect();
    return {
      position: "absolute",
      top: anchor.offsetTop + rect.height,
      left: anchor.offsetLeft,
    };
  }

  render() {
    const flyoutClass = classnames("flyout", { "is-open": this.props.open });
    const anchor = this.props.anchorToEl();
    const anchorId = anchor ? anchor.id : "";

    return (
      <React.Fragment>
        {this.props.open && (
          <div
            className={flyoutClass}
            ref={this.flyoutRef}
            style={this.positionStyles()}
            aria-labelledby={anchorId}
          >
            {this.props.children}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Flyout;

const { string, bool, node, func, arrayOf, instanceOf } = PropTypes;
Flyout.propTypes = {
  id: string,
  children: node.isRequired,
  open: bool.isRequired,
  anchorToEl: func.isRequired,
  doNotCloseOn: arrayOf(instanceOf(HTMLElement)),
  requestClose: func,
  inFlow: bool,
};

Flyout.defaultProps = {
  open: false,
  doNotCloseOn: [],
};
