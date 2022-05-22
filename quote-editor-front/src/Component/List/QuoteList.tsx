import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Quote } from "../../types/quote.type";
import QuoteCard from "../Card/QuoteCard";

interface Props {
  list: Quote[];
}

const QuoteList: React.FC<Props> = ({ list }) => {
  return (
    <div>
      {list.length !== 0 &&
        list.map((item, id) => <QuoteCard item={item} key={item._id} />)}
      <ToastContainer />
    </div>
  );
};

export default QuoteList;
