//creating some helper function

//importing lodash
import _ from "lodash";

//function to get the sum of the transactions
export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount");
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();

  //returning sum
  return sum;
}

//getLabels function
export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let Total = _.sum(getSum(transaction));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

//chart data function
export function chart_Data(transaction, custom) {
  //getting colors
  let bg = _.map(transaction, (a) => a.color);

  //getting unique values from bg
  bg = _.uniq(bg);
  //getting datavalues of transactions
  let dataValue = getSum(transaction);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  //return if user pass second parameter then return that parameter or return default configuration
  return custom ?? config;
}

//get total function
export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
