import React from "react";
import { useForm } from "react-hook-form"; //"useForm" to get all the data from input
import List from "./List";
import { default as api } from "../store/apiSlice";

export default function Form() {
  //   'register' for registering input text boxes
  //   'handleSubmit' for submitting data to form
  //   'resetField' for reseting the value of input text boxes
  const { register, handleSubmit, resetField } = useForm();

  //addTransaction
  const [addTransaction] = api.useAddTransactionMutation();

  //onsubmit event
  const onSubmit = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();

    //for reseting the value after transaction
    resetField("name");
    resetField("amount");
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      {/* using handleSubmit from useForm */}
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="Salary, House Rent, SIP"
              className="form-input"
            />
          </div>

          <select className="form-input" {...register("type")}>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>

          <div className="input-group">
            <input
              type="text"
              {...register("amount")}
              placeholder="Amount"
              className="form-input"
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-indigo-500 w-full">
              Make Transaction
            </button>
          </div>
        </div>
      </form>
      //
      <List></List>
    </div>
  );
}
