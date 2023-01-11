import React from "react";
import Button from "../Button/Button.jsx";

const Pagination = (props) => {
  const { type } = props;
  const prevNextTemplate = (
    <>
      <Button btnType="filled" btnColor="light" iconLeft="left-arrow" disabled>
        Previous
      </Button>

      <Button btnType="filled" btnColor="light" iconRight="right-arrow">
        Next
      </Button>
    </>
  );
  const seeMoreTemplate = (
    <Button btnType="outline" btnColor="light">
      See All
    </Button>
  );
  const loadMoreTemplate = (
    <Button btnType="filled" btnColor="light">
      Load More
    </Button>
  );
  const pagnationNumbersTemplate = (
    <>
      <Button btnType="filled" btnColor="light" disabled>
        Previous
      </Button>
      <div className="pagination__numbers">asdf</div>
      <Button btnType="filled" btnColor="light">
        Next
      </Button>
    </>
  );
  const pagnationDotesTemplate = (amount) => {
    const tempalte = Array.from(amount).map((v, k) => (
      <div className="pagination__dot" key={k}></div>
    ));
    return (
      <div className="pagination__dots">
        {amount}
        {tempalte}
      </div>
    );
  };

  const typeOfTemplate = () => {};

  return <div className="pagination">{pagnationDotesTemplate(3)}</div>;
};

export default Pagination;
