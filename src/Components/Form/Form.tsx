import React from "react";

interface IProps {
  onSubmit: any;
  className?: string;
}

const Form: React.SFC<IProps> = ({ onSubmit, className, children }) => (
  <form
    className={className}
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </form>
);

export default Form;
