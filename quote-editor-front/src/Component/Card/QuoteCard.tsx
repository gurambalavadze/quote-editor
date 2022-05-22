import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import { Quote, ResponseMessage } from "../../types/quote.type";

interface Props {
  item: Quote;
}

type Inputs = {
  quote: string;
  author: string;
};

const QuoteCard: React.FC<Props> = ({ item }) => {
  const [editMode, setEditMode] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<Inputs>();
  const queryClient = useQueryClient();

  const { mutate: updateQuote } = useMutation(
    async (data: Inputs) => {
      const response = await fetch(`${API_URL}/quotes/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({
          _id: item._id,
          quote: data.quote,
          author: data.author,
          _v: item._v,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      return responseData;
    },
    {
      onSuccess: async (data) => {
        console.log("data", data);
        if (data?.result) {
          reset({
            author: "",
            quote: "",
          });

          await queryClient.cancelQueries("quotes");

          const previousTodos =
            queryClient.getQueryData<ResponseMessage>("quotes");

          if (previousTodos) {
            queryClient.setQueryData<ResponseMessage>("quotes", {
              ...previousTodos,
              data: [
                ...(previousTodos.data || []).filter(
                  (quote) => quote._id !== item._id
                ),
                data.data,
              ],
            });
          }
          toast.success("Quote updated successfully");
          setEditMode(false);
        } else if (data?.errors.length) {
          for (let count of data.errors) {
            toast.error(count.message);
          }
        }
      },
      onError: () => {
        toast.error("there was an error");
      },
    }
  );

  const { mutate: deleteQuote } = useMutation(
    async () => {
      const response = await fetch(`${API_URL}/quotes/${item._id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();
      return responseData;
    },
    {
      onSuccess: async (data) => {
        console.log("data", data);
        if (data?.result) {
          await queryClient.cancelQueries("quotes");

          const previousTodos =
            queryClient.getQueryData<ResponseMessage>("quotes");

          if (previousTodos) {
            queryClient.setQueryData<ResponseMessage>("quotes", {
              ...previousTodos,
              data: [
                ...(previousTodos.data || []).filter(
                  (quote) => quote._id !== item._id
                ),
              ],
            });
          }
          toast.success("Quote deleted successfully");
        } else if (data?.errors.length) {
          for (let count of data.errors) {
            toast.error(count.message);
          }
        } else {
          toast.error("error");
        }
      },
      onError: () => {
        toast.error("there was an error");
      },
    }
  );

  const onSubmit = async (data: Inputs) => {
    updateQuote(data);
  };

  const handleDelete = async () => {
    deleteQuote();
  };
  return editMode ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-full mb-9 flex items-start justify-center flex-col  bg-bluelight rounded py-6 px-11 text-blue shadow-box"
    >
      <div className=" w-full flex flex-col items-start justify-start">
        <div className="w-3/5">
          <input
            {...register("author", { required: true })}
            placeholder="Author Name"
            defaultValue={item.author}
            className=" border-solid border-t border-l border-r border-b border-blue w-full bg-white  focus:outline-none py-1 px-4 mt-2"
          />
          {errors.author && (
            <span className=" block mt-1 text-red-600">
              Author Name is required
            </span>
          )}
        </div>

        <div className=" w-3/5">
          <textarea
            {...register("quote", { required: true })}
            defaultValue={item.quote}
            placeholder="Quote Text"
            className=" border-solid border-t border-l border-r border-b border-blue bg-white w-full focus:outline-none resize-none h-36 overflow-auto py-1 px-4 mt-2"
          />
          {errors.quote && (
            <span className=" block mt-1 text-red-600">
              Quote Text is required
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="submit"
          className="  cursor-pointer bg-bluelight1 px-9 py-3 rounded-50xl text-white text-lg font-bold focus:outline-none"
        />
        <input
          type="button"
          className=" ml-4  cursor-pointer bg-bluelight1 px-9 py-3 rounded-50xl text-white text-lg font-bold focus:outline-none"
          defaultValue={"cancel"}
          onClick={() => setEditMode(false)}
        />
      </div>
    </form>
  ) : (
    <div className=" w-full flex flex-col items-start justify-between  bg-bluelight rounded py-6 px-11 text-blue shadow-box mb-9 cursor-pointer ToDoList">
      <p>
        <span className=" description relative text-xl font-normal leading-extra-30">
          {item.quote}
        </span>
        <span className=" ml-4 text-xl font-bold leading-extra-30">
          {item.author}
        </span>
      </p>
      <div className="flex items-center self-end">
        <img
          src="/pen.svg"
          alt="edit"
          className=" w-6 bg-yellow rounded-2xl px-2 py-2 cursor-pointer box-content mr-4"
          onClick={() => {
            setEditMode(true);
          }}
        />
        <img
          src="/delete.svg"
          alt="delete"
          className=" w-6 bg-orange rounded-2xl px-2 py-2 cursor-pointer box-content "
          onClick={() => handleDelete()}
        />
      </div>
    </div>
  );
};

export default QuoteCard;
