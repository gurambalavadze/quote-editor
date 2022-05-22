import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuoteList from "../src/Component/List/QuoteList";
import { API_URL } from "../src/config";
import { ResponseMessage } from "../src/types/quote.type";

type Inputs = {
  quote: string;
  author: string;
};

const Home: NextPage = (props) => {
  const queryClient = useQueryClient();

  const { data: quotes } = useQuery<ResponseMessage>(
    "quotes",
    async () => {
      const res = await fetch(`${API_URL}/quotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      return body;
    },
    { refetchInterval: false }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: "onSubmit",
  });

  const { mutate } = useMutation(
    async (data: Inputs) => {
      const response = await fetch(`${API_URL}/quotes`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      return body;
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
              data: [...(previousTodos.data || []), data.data],
            });
          }

          toast.success("Quote added successfuly");
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
  const onSubmit = (data: Inputs) => {
    const todolist = {
      ...data,
    };

    mutate(todolist);
  };
  return (
    <div className="py-0 px-8">
      <Head>
        <title>Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-4 px-0 flex flex-1 flex-col justify-center items-center">
        <div className=" w-7/12 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full mb-11 flex items-start justify-center flex-col  bg-bluelight rounded pb-6 pt-3 px-11 text-blue shadow-box"
          >
            <p className=" text-2xl  font-bold">Create a quote </p>
            <div className=" w-full flex flex-col items-start justify-start">
              <div className="w-3/5">
                <p className=" text-lg font-normal mt-6">Author</p>

                <input
                  {...register("author", { required: true })}
                  placeholder="Author Name"
                  className=" border-solid border-t border-l border-r border-b border-blue w-full bg-white  focus:outline-none py-1 px-4 mt-2"
                />
                {errors.author && (
                  <span className=" block mt-1 text-red-600">
                    Author Name is required
                  </span>
                )}
              </div>

              <div className=" w-3/5">
                <p className=" text-lg font-normal mt-4">Quote</p>

                <textarea
                  {...register("quote", { required: true })}
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

            <button
              type="submit"
              className=" mt-4 cursor-pointer bg-bluelight1 px-9 py-3 rounded-50xl text-white text-lg font-bold focus:outline-none"
            >
              Create
            </button>
          </form>
          <QuoteList list={quotes?.data || []} />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Home;
