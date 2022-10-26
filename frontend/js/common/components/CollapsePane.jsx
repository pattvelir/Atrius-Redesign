import React from "react";
import PropTypes from "prop-types";

export default class CollapsePane extends React.Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.state = {
      isOpen: props.open || false,
    };
  }

  collapse() {
    const ref = this.contentRef.current;
    // get the height of the content ref
    const contentHeight = ref.scrollHeight;

    // temporarily disable transitions
    const refTransition = ref.style.transition;
    ref.style.transition = "";

    // on the next frame, set the height of the content
    // explicitly, so we're not animating from "auto"
    requestAnimationFrame(() => {
      ref.style.height = contentHeight;
      ref.style.transition = refTransition;

      // on the very next frame, set height to 0
      requestAnimationFrame(() => {
        ref.style.height = "0px";
        this.setState({ isOpen: false });
      });
    });
  }

  expand() {
    const ref = this.contentRef.current;
    // get the height of the content ref
    const contentHeight = ref.scrollHeight;

    // create a one-time callback for when the ref is
    // done the transition
    var self = this;
    ref.addEventListener("transitionend", function handler(e) {
      // remove it immediately
      ref.removeEventListener("transitionend", handler);

      // remove the inline "height" style, reverting back to initial value
      ref.style.height = null;
      self.setState({ isOpen: true });
    });

    // set the height of the ref
    ref.style.height = `${contentHeight}px`;
  }

  toggle = () => (this.state.isOpen ? this.collapse() : this.expand());

  render() {
    const openStateClass = this.state.isOpen ? "is-open" : "is-closed";
    const initialStyle = this.state.isOpen ? {} : { height: "0px" };
    return (
      <section className={`${this.props.className} ${openStateClass}`}>
        {this.props.renderTrigger(this.toggle)}
        <div
          className="collapse-pane__content"
          ref={this.contentRef}
          style={initialStyle}
        >
          {this.props.children}
        </div>
      </section>
    );
  }
}

const { func, bool, node, string } = PropTypes;

CollapsePane.props = {
  open: bool,
  renderTrigger: func.isRequired,
  className: string,
  children: node,
};

CollapsePane.defaultProps = {
  className: "collapse-pane",
};
